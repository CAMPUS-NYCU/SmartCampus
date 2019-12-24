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

// 特殊的 selectedSubOptionId 數值，
// 當 user 要手動輸入 subOption 的文字框時，selectedSubOptionId 會是這個
export const SubOptionOther = Symbol('SubOptionOther');

export const MissionStep = {
  Init: -1,
  PlaceFlagOnMap: 0,
  PlaceFlagOnStreet: 1,
  SelectMission: 2,
  SelectDetail: 3,
  UploadPhoto: 4,
};

const InitialMissionValue = {
  currentStep: MissionStep.Init,
  markerPosition: {
    longitude: 0,
    latitude: 0,
  },
  selectedMissionId: null,
  selectedSubOptionId: null,
  subOptionOtherText: '',
  selectedSubRate: 0,
  moreDescriptionText: '',
  photos: [],
};

export const MissionContext = React.createContext({
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
  handleSetMarkerPosition: () => {},
  handleSetSelectedMissionId: () => {},
  setSelectedSubOptionId: () => {},
  setSubOptionOtherText: () => {},
  setSelectedSubRate: () => {},
  setMoreDescriptionText: () => {},
  setPhotos: () => {},
  ...InitialMissionValue,
});

export const MissionContextProvider = ({ children }) => {
  // ==================== Step control ====================
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
    clearMissionData();
    enqueueSnackbar('標注完成', { variant: 'success' });
  };

  // ==================== UI toggle control ====================
  // 是否顯示各控制元件，點地圖來toggle
  const [showControl, setShowControl] = useState(true);
  const handleToggleShowControl = () => {
    if (isInMission) return; // 正在標注中就不能調整
    setShowControl(!showControl);
  };

  // ==================== Map viewport control ====================
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

  const handleViewportChange = (newViewport) => {
    const { width, height, ...other } = newViewport;
    setViewport(other);
  };

  // ==================== Marker control ====================
  const [markerPosition, setMarkerPosition] = useState(InitialMissionValue.markerPosition);
  const handleSetMarkerPosition = (event) => {
    setMarkerPosition({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
  };

  // ==================== Option control ====================
  // TODO 使用 useReducer 優化這坨 useState？
  const [selectedMissionId, setSelectedMissionId] = useState(InitialMissionValue.selectedMissionId);
  const handleSetSelectedMissionId = (newMissionId) => {
    setSelectedMissionId(newMissionId);
    // mission和subOption有從屬關係，
    // 修改mission的話，subOption也要被重設
    setSelectedSubOptionId(InitialMissionValue.selectedSubOptionId);
  };
  const [selectedSubOptionId, setSelectedSubOptionId] = useState(InitialMissionValue.selectedSubOptionId);
  const [subOptionOtherText, setSubOptionOtherText] = useState(InitialMissionValue.subOptionOtherText);
  const [selectedSubRate, setSelectedSubRate] = useState(InitialMissionValue.selectedSubRate);
  const [moreDescriptionText, setMoreDescriptionText] = useState(InitialMissionValue.moreDescriptionText);
  const [photos, setPhotos] = useState(InitialMissionValue.photos);

  const clearMissionData = () => {
    setStep(InitialMissionValue.currentStep);
    setMarkerPosition(InitialMissionValue.markerPosition);
    setSelectedMissionId(InitialMissionValue.selectedMissionId);
    setSelectedSubOptionId(InitialMissionValue.selectedSubOptionId);
    setSubOptionOtherText(InitialMissionValue.subOptionOtherText);
    setSelectedSubRate(InitialMissionValue.selectedSubRate);
    setMoreDescriptionText(InitialMissionValue.moreDescriptionText);
    setPhotos(InitialMissionValue.photos);
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
    selectedMissionId,
    handleSetSelectedMissionId,
    selectedSubOptionId,
    setSelectedSubOptionId,
    subOptionOtherText,
    setSubOptionOtherText,
    selectedSubRate,
    setSelectedSubRate,
    moreDescriptionText,
    setMoreDescriptionText,
    photos,
    setPhotos,
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
