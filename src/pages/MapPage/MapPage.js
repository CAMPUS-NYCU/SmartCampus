import React from 'react'

import { Fade, Dialog, CircularProgress } from '@material-ui/core'

import HowToUseDialog from './components/HowToUseDialog'
import SearchBar from './components/SearchBar'
import Map from './components/Map'
import useModal from '../../utils/hooks/useModal'
import MissionFab from './components/Mission/MissionFab'
import MissionDrawer from './components/Mission/MissionDrawer'
import ProfileDialog from './components/ProfileDialog/ProfileDialog'
import {
  MissionContextProvider,
  useMissionValue
} from './contexts/MissionContext'
import ReportHistory from './components/ReportHistory'
import { useTagValue } from './contexts/TagContext'
import TagDetailDialog from './components/TagDetail/TagDetailDialog'
import FilterFab from './components/Filter/FilterFab'
import LocationFab from './components/LocationFab'

export default function MapPage(props) {
  const { signOut, deny, guest } = props
  return (
    // <TagContextProvider>
      <MissionContextProvider>
        <MapPageContent signOut={signOut} deny={deny} guest={guest} />
      </MissionContextProvider>
    // </TagContextProvider>
  )
}

const MapPageContent = (props) => {
  const { signOut, deny, guest } = props
  const howToUseDialogControl = useModal()
  const profileDialogControl = useModal()
  const ReportHistoryControl = useModal()
  const { showControl, loading, mapCenter, setMapCenter } = useMissionValue()
  const { activeTag, resetActiveTag } = useTagValue()
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
                  handleOpenHowToUse: howToUseDialogControl.setOpen,
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
          <HowToUseDialog control={howToUseDialogControl} />
          {activeTag && (
            <TagDetailDialog
              activeTag={activeTag}
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
