import React, { useState } from 'react'

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
import MissionBar from './components/Mission/MissionBar'
import ReportHistory from './components/ReportHistory'
import { TagContextProvider, useTagValue } from './contexts/TagContext'
import TagDetailDialog from './components/TagDetail/TagDetailDialog'
import FilterFab from './components/Filter/FilterFab'
import LocationFab from './components/LocationFab'
import { DefaultCenter } from './constants/mapConstants'

export default function MapPage() {
  return (
    <TagContextProvider>
      <MissionContextProvider>
        <MapPageContent />
      </MissionContextProvider>
    </TagContextProvider>
  )
}

const MapPageContent = () => {
  const howToUseDialogControl = useModal()
  const profileDialogControl = useModal()
  const ReportHistoryControl = useModal()
  const {
    showControl,
    isInMission,
    loading,
    mapCenter,
    setMapCenter
  } = useMissionValue()
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
          />
          <MissionFab />
          <FilterFab />
          <LocationFab setMapCenter={setMapCenter} />
        </div>
      </Fade>

      <MissionDrawer />
      <ReportHistory control={ReportHistoryControl} />
      <ProfileDialog control={profileDialogControl} />
      <HowToUseDialog control={howToUseDialogControl} />
      {activeTag && (
        <TagDetailDialog activeTag={activeTag} onClose={resetActiveTag} />
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
