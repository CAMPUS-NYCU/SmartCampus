import React from 'react';
import { useSnackbar } from 'notistack';

import HowToUseDialog from './components/HowToUseDialog';
import SearchBar from './components/SearchBar';
import Map from './components/Map';
import useModal from '../../utils/hooks/useModal';
import MissionFab from './components/Mission/MissionFab';
import MissionDrawer from './components/Mission/MissionDrawer';
import ProfileDialog from './components/ProfileDialog/ProfileDialog';

export default function MapPage() {
  const { enqueueSnackbar } = useSnackbar();

  const howToUseDialogControl = useModal();
  const profileDialogControl = useModal();
  const missionDrawer = useModal();

  const handleAddMissionComplete = () => {
    missionDrawer.setClose();
    enqueueSnackbar('標注完成', { variant: 'success' });
  };

  return (
    <div>
      <Map />

      <MissionFab onClick={missionDrawer.setOpen} />
      <MissionDrawer
        open={missionDrawer.open}
        onClose={missionDrawer.setClose}
        handleAddMissionComplete={handleAddMissionComplete}
      />

      <SearchBar
        menuControls={{
          handleOpenProfile: profileDialogControl.setOpen,
          handleOpenHistory: profileDialogControl.setOpen,
          handleOpenSetting: profileDialogControl.setOpen,
          handleOpenHowToUse: howToUseDialogControl.setOpen,
          handleOpenTerms: profileDialogControl.setOpen,
        }}
      />

      <ProfileDialog control={profileDialogControl} />
      <HowToUseDialog control={howToUseDialogControl} />
    </div>
  );
}
