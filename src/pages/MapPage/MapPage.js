import React from 'react'

import { Fade, Dialog, CircularProgress } from '@material-ui/core'
import { usePosition } from 'use-position'

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
  return (
    <div>
      <Map
        mapCenter={mapCenter}
        userPositionError={positionError}
        userPosition={{ lat: positionLat, lng: positionLng }}
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
      <Dialog
        open={loading}
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
