import React from 'react';

import Fade from '@material-ui/core/Fade';

import HowToUseDialog from './components/HowToUseDialog';
import SearchBar from './components/SearchBar';
import Map from './components/Map';
import useModal from '../../utils/hooks/useModal';
import MissionFab from './components/Mission/MissionFab';
import MissionDrawer from './components/Mission/MissionDrawer';
import ProfileDialog from './components/ProfileDialog/ProfileDialog';
import { MissionContextProvider, useMissionValue } from './contexts/MissionContext';
import MissionBar from './components/Mission/MissionBar';
import { TagContextProvider } from './contexts/TagContext';

export default function MapPage() {
  return (
    <TagContextProvider>
      <MissionContextProvider>
        <MapPageContent />
      </MissionContextProvider>
    </TagContextProvider>
  );
}

const MapPageContent = () => {
  const howToUseDialogControl = useModal();
  const profileDialogControl = useModal();
  const { showControl, isInMission } = useMissionValue();

  return (
    <div>
      <Map />

      <Fade in={showControl}>
        <MissionFab />
      </Fade>
      <MissionDrawer />

      <Fade in={showControl}>
        {
          isInMission ? (
            <MissionBar />
          ) : (
            <SearchBar
              menuControls={{
                handleOpenProfile: profileDialogControl.setOpen,
                handleOpenHistory: profileDialogControl.setOpen,
                handleOpenSetting: profileDialogControl.setOpen,
                handleOpenHowToUse: howToUseDialogControl.setOpen,
                handleOpenTerms: profileDialogControl.setOpen,
              }}
            />
          )
        }
      </Fade>

      <ProfileDialog control={profileDialogControl} />
      <HowToUseDialog control={howToUseDialogControl} />
    </div>
  );
};
