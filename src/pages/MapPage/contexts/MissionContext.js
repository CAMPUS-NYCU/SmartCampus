import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import axios from 'axios'
import debounce from 'utils/debounce'
import * as firebase from 'firebase/app'
import useStep from '../../../utils/hooks/useStep'
import { missionInfo } from '../constants/missionInfo'
import { useTagValue } from './TagContext'
import { DefaultCenter } from '../constants/mapConstants'

export const TAG_UPDATE_MUTATION = gql`
  mutation AddNewTagResponse($input: AddNewTagDataInput!) {
    addNewTagData(data: $input) {
      imageNumber
      imageUploadUrl
    }
  }
`

export const MISSION_MAX_STEP = 2
export const MISSION_MIN_STEP = 0
export const MISSION_NUM_STEPS = 4

// 特殊的 selectedSubOptionId 數值，
// 當 user 要手動輸入 subOption 的文字框時，selectedSubOptionId 會是這個
export const SubOptionOther = Symbol('SubOptionOther')

export const MissionStep = {
  Init: -1,
  selectMissionName: 0,
  PlaceFlagOnMap: 1,
  PlaceFlagOnStreet: 3,
  SelectMission: 2
}

const InitialMissionValue = {
  currentStep: MissionStep.Init,
  markerPosition: {
    longitude: 0,
    latitude: 0
  },
  streetViewPosition: {
    longitude: 0,
    latitude: 0
  },
  streetViewPOV: {
    heading: 0,
    pitch: 0
  },
  selectedCategoryId: null,
  selectedMissionId: '',
  selectedSubOptionId: '',
  subOptionOtherText: '',
  moreDescriptionText: '',
  textLocation: '',
  photos: []
}

export const MissionContext = React.createContext({
  missionType: null,
  setMissionType: () => {},
  isInMission: false,
  handleBack: () => {},
  handleNext: () => {},
  handleSetStep: () => {},
  handleStartMission: () => {},
  handleCloseMission: () => {},
  handleCompleteMission: () => {},
  showControl: true,
  handleToggleShowControl: () => {},
  handleSetMarkerPosition: () => {},
  handleStreetViewOnLoad: () => {},
  handleChangeStreetViewPosition: () => {},
  handleChangeStreetViewPOV: () => {},
  handleSetSelectedCategoryId: () => {},
  handleSetSelectedMissionId: () => {},
  setSelectedSubOptionId: () => {},
  handleChangeSubOptionOtherText: () => {},
  handleChangeMoreDescriptionText: () => {},
  handleChangeTextLocation: () => {},
  setPhotos: () => {},
  handleMapOnLoad: () => {},
  imageFiles: [],
  setImageFiles: () => {},
  setStep: () => {},
  loading: false,
  ableToNextStep: true,
  handleCloseStreetView: () => {},
  handleCompleteStreetView: () => {},
  ...InitialMissionValue
})

export const MissionContextProvider = ({ children }) => {
  const [tagUpdate] = useMutation(TAG_UPDATE_MUTATION)

  // ==================== Step control ====================
  const { enqueueSnackbar } = useSnackbar()
  const {
    step: currentStep,
    handleBack: handleBackStep,
    handleNext: handleNextStep,
    setStep
  } = useStep({
    initialStep: MissionStep.Init,
    maxStep: MISSION_MAX_STEP,
    minStep: MISSION_MIN_STEP
  })
  const isInMission = currentStep >= MissionStep.selectMissionName
  const [isInEdit, setIsInEdit] = useState(false)

  const handleNext = () => {
    // TODO 第一步驟要判斷是否已選擇街景，決定是否直接跳到第三步驟
    if (isInEdit && currentStep === MissionStep.selectMissionName) {
      handleNextStep(2)
    } else {
      handleNextStep(1)
    }
  }
  const handleBack = () => {
    if (isInEdit && currentStep === MissionStep.SelectMission) {
      handleBackStep(2)
    } else {
      handleBackStep(1)
    }
  }

  const [missionType, setMissionType] = useState(null)
  const [mapCenter, setMapCenter] = useState(DefaultCenter)
  const handleStartMission = () => {
    setShowControl(true)
    const center = mapInstance.getCenter()
    setMarkerPosition({
      longitude: center.lng(),
      latitude: center.lat()
    })
    setStreetViewPosition({
      longitude: center.lng(),
      latitude: center.lat()
    })
    setStep(MissionStep.selectMissionName)
  }
  const handleStartEdit = (activeTag) => {
    console.log(activeTag)
    setShowControl(true)
    setMarkerPosition({
      longitude: activeTag.position.lng,
      latitude: activeTag.position.lat
    })
    setMapCenter(activeTag.position)
    console.log(activeTag.position)
    console.log(markerPosition)
    setStreetViewPosition({
      longitude: activeTag.position.lng,
      latitude: activeTag.position.lat
    })
    setMissionType(
      missionInfo.findIndex(
        (element) => element.missionName === activeTag.category.missionName
      )
    )
    console.log(missionType)
    setSelectedMissionId(activeTag.category.subTypeName)
    setSelectedSubOptionId(activeTag.category.targetName)
    setStep(MissionStep.selectMissionName)
    setMoreDescriptionText(tagDetail.description)
    setTextLocation(activeTag.locationName)
    setIsInEdit(true)
  }

  const handleCloseMission = () => {
    clearMissionData()
    setMissionType(null)
    setStep(MissionStep.Init)
    setIsInEdit(false)
  }
  const handleCloseEdit = () => {
    clearMissionData()
    setMissionType(null)
    setStep(MissionStep.Init)
    setIsInEdit(false)
  }

  const { refetch, updateTagList, tagDetail } = useTagValue()

  const handleCompleteMission = () => {
    setLoading(true)
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        tagUpdate({
          context: {
            headers: {
              authorization: token ? `Bearer ${token}` : ''
            }
          },
          variables: {
            input: {
              locationName: textLocation,
              category: {
                missionName: missionInfo[missionType].missionName.toString(),
                subTypeName: selectedMissionId.toString(),
                targetName: selectedSubOptionId.toString()
              },
              accessibility: 0, // API目前accessibility必填，因此先保留
              coordinates: {
                latitude: streetViewUpload
                  ? streetViewPosition.latitude.toString()
                  : markerPosition.latitude.toString(),
                longitude: streetViewUpload
                  ? streetViewPosition.longitude.toString()
                  : markerPosition.longitude.toString()
              },
              // createUserID: 'NO_USER',
              description: moreDescriptionText,
              imageNumber: imageFiles.length,
              streetViewInfo: {
                povHeading: streetViewPOV.heading,
                povPitch: streetViewPOV.pitch,
                panoID: '',
                latitude: streetViewPosition.latitude,
                longitude: streetViewPosition.longitude
              }
            }
          }
        }).then(
          ({
            data: {
              addNewTagData: { imageNumber, imageUploadUrl }
            }
          }) => {
            imageUploadUrl.forEach((url, index) => {
              // const contentType = imageFiles[index].type
              const options = {
                headers: {
                  'Content-Type': 'application/octet-stream'
                }
              }
              axios.put(url, imageFiles[index], options).then((res) => {
                refetch().then((data) => {
                  updateTagList(data.data)
                  setLoading(false)
                  clearMissionData()
                  setMissionType(null)
                  enqueueSnackbar('標注完成', { variant: 'success' })
                })
              })
            })
            if (imageUploadUrl.length === 0) {
              refetch().then((data) => {
                updateTagList(data.data)
                setLoading(false)
                clearMissionData()
                setMissionType(null)
                enqueueSnackbar('標注完成', { variant: 'success' })
              })
            }
          }
        )
      })

    // .catch()
    // .finally()
  }

  // 照片
  const [imageFiles, setImageFiles] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  // ==================== UI toggle control ====================
  // 是否顯示各控制元件，點地圖來toggle
  const [showControl, setShowControl] = useState(true)
  const handleToggleShowControl = () => {
    if (isInMission || isInEdit) return // 正在標注中就不能調整
    setShowControl(!showControl)
  }

  // ==================== Map viewport control ====================
  const [mapInstance, setMapInstance] = React.useState(null)
  const handleMapOnLoad = (map) => {
    setMapInstance(map)
  }

  // ==================== Marker control ====================
  const [markerPosition, setMarkerPosition] = useState(
    InitialMissionValue.markerPosition
  )
  const handleSetMarkerPosition = (event) => {
    setMarkerPosition({
      longitude: event.latLng.lng(),
      latitude: event.latLng.lat()
    })
    // ? marker改地點，street view也要重設？
    setStreetViewPosition({
      longitude: event.latLng.lng(),
      latitude: event.latLng.lat()
    })
  }

  // ==================== Street View control ====================
  const [streetViewUpload, setStreetViewUpload] = useState(false)
  const [streetViewInstance, setStreetViewInstance] = useState(null)
  const [povChanged, setPovChanged] = useState(false)
  const handleStreetViewOnLoad = (panorama) => {
    setStreetViewInstance(panorama)
  }
  const [streetViewPosition, setStreetViewPosition] = useState(
    InitialMissionValue.streetViewPosition
  )
  const handleChangeStreetViewPosition = () => {
    if (!streetViewInstance) return
    setStreetViewPosition({
      longitude: streetViewInstance.position.lng(),
      latitude: streetViewInstance.position.lat()
    })
  }
  const [streetViewPOV, setStreetViewPOV] = useState(
    InitialMissionValue.streetViewPOV
  )
  const handleChangeStreetViewPOVUndebounced = () => {
    if (!streetViewInstance) return
    setPovChanged(true)
    setStreetViewPOV({
      heading: streetViewInstance.pov.heading,
      pitch: streetViewInstance.pov.pitch
    })
  }
  // ! 因為不debounce的話，街景FPS會很低，所以加入debounce
  const handleChangeStreetViewPOV = debounce(
    handleChangeStreetViewPOVUndebounced,
    200
  )
  const handleCompleteStreetView = () => {
    if (!streetViewInstance) {
      setStreetViewUpload(true)
      setPovChanged(false)
      handleBack()
      return
    }
    setPovChanged(false)
    setStreetViewUpload(true)
    setStreetViewPOV({
      heading: streetViewInstance.pov.heading,
      pitch: streetViewInstance.pov.pitch
    })
    setStreetViewPosition({
      longitude: streetViewInstance.position.lng(),
      latitude: streetViewInstance.position.lat()
    })
    setStep(MissionStep.PlaceFlagOnMap)
  }
  const handleCloseStreetView = () => {
    setStreetViewPosition({
      longitude: markerPosition.longitude,
      latitude: markerPosition.latitude
    })
    setPovChanged(false)
    setStreetViewPOV(InitialMissionValue.streetViewPOV)
    setStreetViewUpload(false)
    setStep(MissionStep.PlaceFlagOnMap)
  }

  // ==================== Option control ====================
  // TODO 使用 useReducer 優化這坨 useState？

  // --------------- Category ---------------
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    InitialMissionValue.selectedCategoryId
  )
  const handleSetSelectedCategoryId = (newCategoryId) => {
    setSelectedCategoryId(newCategoryId)
  }

  // --------------- Mission ---------------
  const [selectedMissionId, setSelectedMissionId] = useState(
    InitialMissionValue.selectedMissionId
  )
  const handleSetSelectedMissionId = (newMissionId) => {
    setSelectedMissionId(newMissionId)
    // mission和subOption有從屬關係，
    // 修改mission的話，subOption也要被重設
    setSelectedSubOptionId(InitialMissionValue.selectedSubOptionId)
  }

  // --------------- Discovery ---------------
  const [selectedSubOptionId, setSelectedSubOptionId] = useState(
    InitialMissionValue.selectedSubOptionId
  )
  const [subOptionOtherText, setSubOptionOtherText] = useState(
    InitialMissionValue.subOptionOtherText
  )
  const handleChangeSubOptionOtherText = (event) =>
    setSubOptionOtherText(event.target.value)

  // --------------- Description ---------------
  const [moreDescriptionText, setMoreDescriptionText] = useState(
    InitialMissionValue.moreDescriptionText
  )
  const handleChangeMoreDescriptionText = (event) =>
    setMoreDescriptionText(event.target.value)
  const [photos, setPhotos] = useState(InitialMissionValue.photos)

  // --------------- Location Text ---------------
  const [textLocation, setTextLocation] = useState(
    InitialMissionValue.textLocation
  )
  const handleChangeTextLocation = (event) => {
    setTextLocation(event.target.value)
  }

  // ==================== Clear ====================
  const clearMissionData = () => {
    setImageFiles([])
    setStep(InitialMissionValue.currentStep)
    setMarkerPosition(InitialMissionValue.markerPosition)
    setSelectedCategoryId(InitialMissionValue.selectedCategoryId)
    setSelectedMissionId(InitialMissionValue.selectedMissionId)
    setSelectedSubOptionId(InitialMissionValue.selectedSubOptionId)
    setSubOptionOtherText(InitialMissionValue.subOptionOtherText)
    setMoreDescriptionText(InitialMissionValue.moreDescriptionText)
    setPhotos(InitialMissionValue.photos)
    setTextLocation(InitialMissionValue.textLocation)
    setStreetViewPosition({
      longitude: markerPosition.longitude,
      latitude: markerPosition.latitude
    })
    setStreetViewPOV(InitialMissionValue.streetViewPOV)
    setStreetViewUpload(false)
    setPreviewImages([])
  }

  // ===================== Loading =======================
  const [loading, setLoading] = useState(false)

  // ========== Token ==========

  const checkNextStep = () => {
    if (currentStep === MissionStep.selectMissionName)
      return missionType !== null
    if (currentStep === MissionStep.SelectMission)
      return selectedMissionId !== '' && selectedSubOptionId !== ''
    return true
  }
  const ableToNextStep = checkNextStep()

  const contextValues = {
    missionType,
    setMissionType,
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
    markerPosition,
    handleSetMarkerPosition,
    handleStreetViewOnLoad,
    streetViewPosition,
    handleChangeStreetViewPosition,
    streetViewPOV,
    handleChangeStreetViewPOV,
    selectedCategoryId,
    handleSetSelectedCategoryId,
    selectedMissionId,
    handleSetSelectedMissionId,
    selectedSubOptionId,
    setSelectedSubOptionId,
    subOptionOtherText,
    handleChangeSubOptionOtherText,
    moreDescriptionText,
    handleChangeMoreDescriptionText,
    textLocation,
    setTextLocation,
    handleChangeTextLocation,
    photos,
    setPhotos,
    handleMapOnLoad,
    imageFiles,
    setImageFiles,
    setStep,
    loading,
    ableToNextStep,
    handleCloseStreetView,
    handleCompleteStreetView,
    streetViewUpload,
    povChanged,
    previewImages,
    setPreviewImages,
    isInEdit,
    handleStartEdit,
    handleCloseEdit,
    mapCenter,
    setMapCenter
  }
  return (
    <MissionContext.Provider value={contextValues}>
      {children}
    </MissionContext.Provider>
  )
}
MissionContextProvider.propTypes = {
  children: PropTypes.any
}
MissionContextProvider.defaultProps = {
  children: null
}

export const useMissionValue = () => useContext(MissionContext)
