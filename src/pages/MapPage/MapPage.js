import React, { useState } from 'react';

import Fade from '@material-ui/core/Fade';

import HowToUseDialog from './components/HowToUseDialog';
import SearchBar from './components/SearchBar';
import Map from './components/Map';
import useModal from '../../utils/hooks/useModal';
import MissionFab from './components/Mission/MissionFab';
import MissionDrawer from './components/Mission/MissionDrawer';
import ProfileDialog from './components/ProfileDialog/ProfileDialog';
import { MissionContextProvider } from './contexts/MissionContext';

export default function MapPage() {
  return (
    <MissionContextProvider>
      <MapPageContent />
    </MissionContextProvider>
  );
}

const MapPageContent = () => {
  const howToUseDialogControl = useModal();
  const profileDialogControl = useModal();

  // 是否顯示各控制元件，點地圖來toggle
  const [showControl, setShowControl] = useState(true);
  const handleMapClick = () => {
    setShowControl(!showControl);
  };

  return (
    <div>
      <Map
        handleMapClick={handleMapClick}
      />

      <Fade in={showControl}>
        <MissionFab />
      </Fade>
      <MissionDrawer />

      <Fade in={showControl}>
        <SearchBar
          menuControls={{
            handleOpenProfile: profileDialogControl.setOpen,
            handleOpenHistory: profileDialogControl.setOpen,
            handleOpenSetting: profileDialogControl.setOpen,
            handleOpenHowToUse: howToUseDialogControl.setOpen,
            handleOpenTerms: profileDialogControl.setOpen,
          }}
        />
      </Fade>

      <ProfileDialog control={profileDialogControl} />
      <HowToUseDialog control={howToUseDialogControl} />
    </div>
  );
};
