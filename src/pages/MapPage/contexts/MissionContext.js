import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import useStep from '../../../utils/hooks/useStep';
import { DefaultCenter, DefaultZoom } from '../constants/mapConstants';

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
  center: DefaultCenter,
  zoom: DefaultZoom,
  handleMapChange: () => {},
  handleToggleShowControl: () => {},
  handleSetMarkerPosition: () => {},
  handleSetSelectedMissionId: () => {},
  setSelectedSubOptionId: () => {},
  handleChangeSubOptionOtherText: () => {},
  setSelectedSubRate: () => {},
  handleChangeMoreDescriptionText: () => {},
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
      longitude: center.lng,
      latitude: center.lat,
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
  const [center, setCenter] = React.useState(DefaultCenter);
  const [zoom, setZoom] = React.useState(DefaultZoom);
  const handleMapChange = ({ center: newCenter, zoom: newZoom }) => {
    setCenter(newCenter);
    setZoom(newZoom);
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
  const handleChangeSubOptionOtherText = (event) => setSubOptionOtherText(event.target.value);
  const [selectedSubRate, setSelectedSubRate] = useState(InitialMissionValue.selectedSubRate);
  const [moreDescriptionText, setMoreDescriptionText] = useState(InitialMissionValue.moreDescriptionText);
  const handleChangeMoreDescriptionText = (event) => setMoreDescriptionText(event.target.value);
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
    center,
    zoom,
    handleMapChange,
    markerPosition,
    handleSetMarkerPosition,
    selectedMissionId,
    handleSetSelectedMissionId,
    selectedSubOptionId,
    setSelectedSubOptionId,
    subOptionOtherText,
    handleChangeSubOptionOtherText,
    selectedSubRate,
    setSelectedSubRate,
    moreDescriptionText,
    handleChangeMoreDescriptionText,
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
