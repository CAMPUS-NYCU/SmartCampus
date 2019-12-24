import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import useStep from '../../../utils/hooks/useStep';

const INITIAL_VIEWPORT = {
  longitude: 120.9969249, // 交大經緯度
  latitude: 24.7872616,
  zoom: 17,
};

export const MISSION_MAX_STEP = 4;
export const MISSION_MIN_STEP = 0;
export const MISSION_NUM_STEPS = 5;

export const MissionStep = {
  Init: -1,
  PlaceFlagOnMap: 0,
  PlaceFlagOnStreet: 1,
  SelectMission: 2,
  SelectDetail: 3,
  UploadPhoto: 4,
};

export const MissionContext = React.createContext({
  currentStep: MissionStep.Init,
  isInMission: false,
  handleBack: () => {},
  handleNext: () => {},
  handleSetStep: () => {},
  handleStartMission: () => {},
  handleCloseMission: () => {},
  handleCompleteMission: () => {},
  showControl: true,
  viewport: INITIAL_VIEWPORT,
  handleViewportChange: () => {},
  handleToggleShowControl: () => {},
  markerPosition: {
    longitude: 0,
    latitude: 0,
  },
  handleSetMarkerPosition: () => {},
});

export const MissionContextProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    step: currentStep,
    handleBack,
    handleNext,
    setStep,
  } = useStep({
    initialStep: MissionStep.Init,
    maxStep: MISSION_MAX_STEP,
    minStep: MISSION_MIN_STEP,
  });
  const isInMission = currentStep >= MissionStep.PlaceFlagOnMap;

  // 是否顯示各控制元件，點地圖來toggle
  const [showControl, setShowControl] = useState(true);
  const handleToggleShowControl = () => {
    if (isInMission) return; // 正在標注中就不能調整
    setShowControl(!showControl);
  };

  const handleStartMission = () => {
    setShowControl(true);
    setMarkerPosition({
      longitude: viewport.longitude,
      latitude: viewport.latitude,
    });
    setStep(MissionStep.PlaceFlagOnMap);
  };

  const handleCloseMission = () => {
    setStep(MissionStep.Init);
  };

  const handleCompleteMission = () => {
    setStep(MissionStep.Init);
    enqueueSnackbar('標注完成', { variant: 'success' });
  };

  // Map viewport control
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

  const handleViewportChange = (newViewport) => {
    const { width, height, ...other } = newViewport;
    setViewport(other);
  };

  // Marker control
  const [markerPosition, setMarkerPosition] = useState({
    longitude: 0,
    latitude: 0,
  });
  const handleSetMarkerPosition = (event) => {
    setMarkerPosition({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
  };

  const contextValues = {
    currentStep,
    isInMission,
    handleBack,
    handleNext,
    handleSetStep: setStep,
    handleStartMission,
    handleCloseMission,
    handleCompleteMission,
    showControl,
    handleToggleShowControl,
    viewport,
    handleViewportChange,
    markerPosition,
    handleSetMarkerPosition,
  };
  return (
    <MissionContext.Provider value={contextValues}>
      {children}
    </MissionContext.Provider>
  );
};
MissionContextProvider.propTypes = {
  children: PropTypes.any,
};
MissionContextProvider.defaultProps = {
  children: null,
};

export const useMissionValue = () => useContext(MissionContext);
