import React from 'react'

import { Fade, Dialog, CircularProgress } from '@material-ui/core'

import SearchBar from './components/SearchBar'
import Map from './components/Map'
import useModal from '../../utils/hooks/useModal'
import MissionFab from './components/Mission/MissionFab'
import MissionDrawer from './components/Mission/MissionDrawer'
import ProfileDialog from './components/ProfileDialog/ProfileDialog'
import {
  MissionContextProvider,
  useMissionValue
} from '../../utils/contexts/MissionContext'
import ReportHistory from './components/ReportHistory'
import GuidePage from './components/GuidePage'
import { useTagValue } from '../../utils/contexts/TagContext'
import useStep from '../../utils/hooks/useStep'
import TagDetailDrawer from './components/TagDetailDrawer'
import FilterFab from './components/Filter/FilterFab'
import LocationFab from './components/LocationFab'
import WindowBackProvider from '../../utils/WindowBackProvider'

export default function MapPage(props) {
  const { signOut, deny, guest } = props
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
        guest={guest}
      />
      <MapPageContent
        signOut={signOut}
        deny={deny}
        guest={guest}
        setGuideStep={setStep}
      />
    </MissionContextProvider>
  )
}

const MapPageContent = (props) => {
  const { signOut, deny, guest, setGuideStep } = props
  const profileDialogControl = useModal()
  const ReportHistoryControl = useModal()
  const { showControl, loading, mapCenter, setMapCenter } = useMissionValue()
  const { activeTag, resetActiveTag, tagDetail } = useTagValue()
  return (
    <div>
      <Map mapCenter={mapCenter} />
      <Fade in={showControl}>
        <div>
          <SearchBar
            menuControls={{
              handleOpenProfile: profileDialogControl.setOpen,
              handleOpenHistory: ReportHistoryControl.setOpen,
              handleOpenSetting: profileDialogControl.setOpen,
              handleOpenHowToUse: () => {
                setGuideStep(0)
              },
              handleOpenTerms: profileDialogControl.setOpen
            }}
            signOut={guest ? deny : signOut}
          />
          <MissionFab deny={deny} guest={guest} />
          <FilterFab />
          <LocationFab setMapCenter={setMapCenter} />
        </div>
      </Fade>
      <MissionDrawer />
      <ReportHistory control={ReportHistoryControl} />
      <ProfileDialog control={profileDialogControl} />
      {activeTag && (
        <TagDetailDrawer
          activeTag={activeTag}
          tagDetail={tagDetail}
          onClose={resetActiveTag}
          deny={deny}
          guest={guest}
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
