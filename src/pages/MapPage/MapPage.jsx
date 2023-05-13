import React, { useEffect, useState } from 'react'

import { Fade, Dialog, CircularProgress } from '@material-ui/core'
import { usePosition } from 'use-position'
import { useJsApiLoader } from '@react-google-maps/api'
import { useParams, useHistory } from 'react-router-dom'

import SearchBar from './components/SearchBar'
import Map from './components/Map'
import useModal from '../../utils/hooks/useModal'
import MissionFab from './components/Mission/MissionFab'
import MissionListFab from './components/Mission/MissionListFab'
import MissionDrawer from './components/Mission/MissionDrawer'
import {
  MissionContextProvider,
  useMissionValue
} from '../../utils/contexts/MissionContext'
import { MAP_PATH } from '../../constants/pageUrls'
import ReportHistory from './components/ReportHistory'
import GuidePage from './components/GuidePage'
import { useTagValue } from '../../utils/contexts/TagContext'
import { useUserValue } from '../../utils/contexts/UserContext'
import useStep from '../../utils/hooks/useStep'
import TagDetailDrawer from './components/TagDetailDrawer'
import FixedTagDetailDrawer from './components/FixedTagDetailDrawer'
import FilterFab from './components/Filter/FilterFab'
import LocationFab from './components/LocationFab'
import WindowBackProvider from '../../utils/WindowBackProvider'
import UserDialog from './components/UserDialog/UserDialog'
import { REACT_APP_GOOGLE_MAP_API_KEY } from '../../constants/envValues'
import { LOADED_LIBRARIES } from '../../constants/mapConstants'

export default function MapPage() {
  const { step: guideStep, setStep, handleNext, handleBack } = useStep({
    initialStep: 0,
    maxStep: 3,
    minStep: 0
  })
  const [skip, setSkip] = useState(true) // use to determine whether to skip the guide page
  return (
    <MissionContextProvider>
      <WindowBackProvider />
      <GuidePage
        step={guideStep}
        setStep={setStep}
        handleNext={() => handleNext(1)}
        handleBack={() => handleBack(1)}
        skip={skip}
      />
      <MapPageContent setGuideStep={setStep} setSkip={setSkip} />
    </MissionContextProvider>
  )
}

const MapPageContent = (props) => {
  const { setGuideStep, setSkip } = props
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: LOADED_LIBRARIES,
    language: 'zh-TW'
  })
  const history = useHistory()
  const userDialogControl = useModal()
  const ReportHistoryControl = useModal()
  const { showControl, loading, mapCenter, setMapCenter } = useMissionValue()
  const {
    activeTag,
    activeFixedTag,
    resetActiveTag,
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
                  handleOpenHowToUse: () => {
                    setSkip(false)
                    setGuideStep(0)
                  },
                  handleOpenTerms: userDialogControl.setOpen
                }}
                setPlacePosition={setPlacePosition}
                search={search}
                setSearch={setSearch}
                setPlaceName={setPlaceName}
              />
              <MissionFab />
              <MissionListFab />
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
          {activeTag && (
            <TagDetailDrawer
              activeTag={activeTag}
              tagDetail={tagDetail}
              onClose={() => history.push(MAP_PATH)}
            />
          )}
          {activeFixedTag && (
            <FixedTagDetailDrawer
              activeFixedTag={activeFixedTag}
              fixedtagDetail={fixedtagDetail}
              onClose={() => history.push(MAP_PATH)}
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
