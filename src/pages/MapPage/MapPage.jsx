import React, { useEffect, useState } from 'react'

import {
  Box,
  Fade,
  Dialog,
  CircularProgress,
  Modal,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import DangerousIcon from '@mui/icons-material/Dangerous'
import { usePosition } from 'use-position'
import { useJsApiLoader } from '@react-google-maps/api'
import { useParams, useHistory } from 'react-router-dom'

import SearchBar from './components/SearchBar'
import Map from './components/Map'
import useModal from '../../utils/hooks/useModal'
import MissionDrawer from './components/Mission/MissionDrawer'
import {
  MissionContextProvider,
  useMissionValue
} from '../../utils/contexts/MissionContext'
import { MAP_PATH } from '../../constants/pageUrls'
import ReportHistory from './components/ReportHistory'
import { useTagValue } from '../../utils/contexts/TagContext'
import { useUserValue } from '../../utils/contexts/UserContext'
import TagDetailDrawer from './components/TagDetailDrawer'
import FixedTagDetailDrawer from './components/FixedTagDetailDrawer'
import FilterFab from './components/Filter/FilterFab'
import LocationFab from './components/LocationFab'
import WindowBackProvider from '../../utils/WindowBackProvider'
import UserDialog from './components/UserDialog/UserDialog'
import { VITE_GOOGLE_MAP_API_KEY } from '../../constants/envValues'
import { LOADED_LIBRARIES } from '../../constants/mapConstants'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px'
}

export default function MapPage() {
  const isMobile = useMediaQuery(useTheme().breakpoints.up('sm'))
  return (
    <MissionContextProvider>
      <WindowBackProvider />
      <Modal
        open={isMobile}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box display='flex' flexDirection='row' alignItems='center'>
            <DangerousIcon fontSize='large' color='error' />
            <Typography id='modal-modal-title' variant='h5' color='error'>
              電腦版瀏覽器暫不支援
            </Typography>
          </Box>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            實驗進行中，電腦版瀏覽器暫不支援，敬請見諒。如果您是實驗參與者，請使用手機板瀏覽器開啟此頁面，感謝！
          </Typography>
        </Box>
      </Modal>
      <MapPageContent />
    </MissionContextProvider>
  )
}

const MapPageContent = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: VITE_GOOGLE_MAP_API_KEY,
    libraries: LOADED_LIBRARIES,
    language: 'zh-TW'
  })
  const history = useHistory()
  const userDialogControl = useModal()
  const ReportHistoryControl = useModal()
  const { isInMission, showControl, loading, mapCenter, setMapCenter } =
    useMissionValue()
  const {
    activeTag,
    activeFixedTag,
    resetActiveTag,
    resetActiveFixedTag,
    tagDetail,
    fixedtagDetail,
    setActiveTagId,
    isDeleting
  } = useTagValue()
  const { uid } = useUserValue()
  const { activeTagId } = useParams()
  const {
    latitude: positionLat,
    longitude: positionLng,
    error: positionError
  } = usePosition(true) // every 0.5 minute will update position
  useEffect(() => {
    if (activeTagId) setActiveTagId(activeTagId)
    else resetActiveTag()
  }, [activeTagId, resetActiveTag, setActiveTagId])
  useEffect(() => {
    if (loadError) {
      console.error('Google map load error')
    }
  }, [loadError])
  const [placePosition, setPlacePosition] = useState('')
  const [placeName, setPlaceName] = useState('')
  const [search, setSearch] = useState(false)

  const handleTagDetailDrawerClose = () => {
    resetActiveTag()
    switch (history.action) {
      case 'POP':
      case 'REPLACE':
        history.push(MAP_PATH)
        break
      case 'PUSH':
        history.goBack()
        break
      default:
        history.push(MAP_PATH)
    }
  }
  const handleFixedTagDetailDrawerClose = () => {
    resetActiveFixedTag()
    history.push(MAP_PATH)
  }

  return (
    <div>
      {isLoaded && (
        <>
          <Map
            mapCenter={mapCenter}
            userPositionError={positionError}
            userPosition={{ lat: positionLat, lng: positionLng }}
            place={placePosition}
            search={search}
            placeName={placeName}
          />
          <Fade in={showControl}>
            <div>
              <SearchBar
                menuControls={{
                  handleOpenUser: userDialogControl.setOpen,
                  handleOpenHistory: ReportHistoryControl.setOpen,
                  handleOpenSetting: userDialogControl.setOpen,
                  handleOpenTerms: userDialogControl.setOpen
                }}
                setPlacePosition={setPlacePosition}
                search={search}
                setSearch={setSearch}
                setPlaceName={setPlaceName}
              />
              <FilterFab />
              <LocationFab
                setMapCenter={() => {
                  if (!positionError)
                    setMapCenter({ lat: positionLat, lng: positionLng })
                }}
              />
            </div>
          </Fade>
          <MissionDrawer />
          <ReportHistory control={ReportHistoryControl} />
          <UserDialog userId={uid} control={userDialogControl} />
          {!isInMission && activeTag && (
            <TagDetailDrawer
              activeTag={activeTag}
              tagDetail={tagDetail}
              onClose={handleTagDetailDrawerClose}
            />
          )}
          {!isInMission && activeFixedTag && (
            <FixedTagDetailDrawer
              activeFixedTag={activeFixedTag}
              fixedtagDetail={fixedtagDetail}
              onClose={handleFixedTagDetailDrawerClose}
            />
          )}
        </>
      )}
      <Dialog
        open={loading || !isLoaded || isDeleting}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            width: '50px',
            height: '50px'
          }
        }}
      >
        <CircularProgress />
      </Dialog>
    </div>
  )
}
