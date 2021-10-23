<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
=======
import React, { useEffect } from 'react'
>>>>>>> 9a309b3 (Add default google map autocomplete api)
=======
import React, { useEffect, useState } from 'react'
>>>>>>> 49e2e8b (Open search function)
=======
import React, { useEffect, useState } from 'react'
>>>>>>> 9c54d8a2a07f4ccdd42cc7128df624b8a46bb3ab

import { Fade, Dialog, CircularProgress } from '@material-ui/core'
import { usePosition } from 'use-position'
import { useJsApiLoader } from '@react-google-maps/api'

import SearchBar from './components/SearchBar'
import Map from './components/Map'
import useModal from '../../utils/hooks/useModal'
import MissionFab from './components/Mission/MissionFab'
import MissionDrawer from './components/Mission/MissionDrawer'
import {
  MissionContextProvider,
  useMissionValue
} from '../../utils/contexts/MissionContext'
import ReportHistory from './components/ReportHistory'
import GuidePage from './components/GuidePage'
import { useTagValue } from '../../utils/contexts/TagContext'
import { useUserValue } from '../../utils/contexts/UserContext'
import useStep from '../../utils/hooks/useStep'
import TagDetailDrawer from './components/TagDetailDrawer'
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
  return (
    <MissionContextProvider>
      <WindowBackProvider />
      <GuidePage
        step={guideStep}
        setStep={setStep}
        handleNext={() => handleNext(1)}
        handleBack={() => handleBack(1)}
      />
      <MapPageContent setGuideStep={setStep} />
    </MissionContextProvider>
  )
}

const MapPageContent = (props) => {
  const { setGuideStep } = props
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: LOADED_LIBRARIES,
    language: 'zh-TW'
  })
  const userDialogControl = useModal()
  const ReportHistoryControl = useModal()
  const { showControl, loading, mapCenter, setMapCenter } = useMissionValue()
  const { activeTag, resetActiveTag, tagDetail } = useTagValue()
  const { uid } = useUserValue()
  const {
    latitude: positionLat,
    longitude: positionLng,
    error: positionError
  } = usePosition(false)
  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    if (positionError) {
      console.error(positionError)
    }
  }, [positionError])
=======
=======
>>>>>>> 9a309b3 (Add default google map autocomplete api)
=======
>>>>>>> 9c54d8a2a07f4ccdd42cc7128df624b8a46bb3ab
    if (loadError) {
      alert('Google map load error')
    }
  }, [loadError])
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 362b15d (Add default google map autocomplete api)
=======
  const [placePosition, setPlacePosition] = useState('')
  const [placeName, setPlaceName] = useState('')
  const [search, setSearch] = useState(false)
>>>>>>> d90b176 (Open search function)
=======
>>>>>>> 9a309b3 (Add default google map autocomplete api)
=======
  const [placePosition, setPlacePosition] = useState('')
  const [placeName, setPlaceName] = useState('')
  const [search, setSearch] = useState(false)
>>>>>>> 49e2e8b (Open search function)
=======
  const [placePosition, setPlacePosition] = useState('')
  const [placeName, setPlaceName] = useState('')
  const [search, setSearch] = useState(false)
>>>>>>> 9c54d8a2a07f4ccdd42cc7128df624b8a46bb3ab
  return (
    <div>
      {isLoaded && (
        <>
          <Map
            mapCenter={mapCenter}
            userPositionError={positionError}
            userPosition={{ lat: positionLat, lng: positionLng }}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            place={placePosition}
            search={search}
            placeName={placeName}
=======
>>>>>>> 9a309b3 (Add default google map autocomplete api)
=======
            place={placePosition}
            search={search}
            placeName={placeName}
>>>>>>> 49e2e8b (Open search function)
=======
            place={placePosition}
            search={search}
            placeName={placeName}
>>>>>>> 9c54d8a2a07f4ccdd42cc7128df624b8a46bb3ab
          />
          <Fade in={showControl}>
            <div>
              <SearchBar
                menuControls={{
                  handleOpenUser: userDialogControl.setOpen,
                  handleOpenHistory: ReportHistoryControl.setOpen,
                  handleOpenSetting: userDialogControl.setOpen,
                  handleOpenHowToUse: () => {
                    setGuideStep(0)
                  },
                  handleOpenTerms: userDialogControl.setOpen
                }}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 49e2e8b (Open search function)
=======
>>>>>>> 9c54d8a2a07f4ccdd42cc7128df624b8a46bb3ab
                setPlacePosition={setPlacePosition}
                search={search}
                setSearch={setSearch}
                setPlaceName={setPlaceName}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9a309b3 (Add default google map autocomplete api)
=======
>>>>>>> 49e2e8b (Open search function)
=======
>>>>>>> 9c54d8a2a07f4ccdd42cc7128df624b8a46bb3ab
              />
              <MissionFab />
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
              onClose={resetActiveTag}
            />
          )}
        </>
      )}
      <Dialog
        open={loading || !isLoaded}
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
