import React, { useContext, useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import axios from 'axios'
import debounce from 'utils/debounce'
import * as firebase from 'firebase/app'
import useStep from '../hooks/useStep'
import { missionInfo } from '../../constants/missionInfo'
import tagDate from '../../constants/tagData'
import { useTagValue } from './TagContext'
import { DefaultCenter } from '../../constants/mapConstants'

export const TAG_ADD_MUTATION = gql`
  mutation AddNewTagResponse($input: addTagDataInput!) {
    addNewTagData(data: $input) {
      imageUploadNumber
      imageUploadUrls
    }
  }
`
export const TAG_UPDATE_MUTATION = gql`
  mutation AddOrUpdateTagResponse($tagId: ID!, $data: updateTagDataInput!) {
    updateTagData(tagId: $tagId, data: $data) {
      imageUploadUrls
      imageDeleteStatus
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
  const [tagAdd] = useMutation(TAG_ADD_MUTATION)
  const [tagUpdate] = useMutation(TAG_UPDATE_MUTATION)

  const [isInEdit, setIsInEdit] = useState(false)

  const [missionType, setMissionType] = useState(null)
  const [mapCenter, setMapCenter] = useState(DefaultCenter)

  // 照片
  const [imageFiles, setImageFiles] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [imageDeleteUrls, setImageDeleteUrls] = useState([])
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
  const {
    activeTag,
    refetch,
    tagDetail,
    refetchUserAddTags,
    refetchTagDetail
  } = useTagValue()
  const handleBack = useCallback(() => {
    setSelectedMissionId(InitialMissionValue.selectedMissionId)
    setSelectedSubOptionId(InitialMissionValue.selectedSubOptionId)
    setRemindOpen(false)
    if (isInEdit && currentStep === MissionStep.SelectMission) {
      handleBackStep(2)
    } else if (isInEdit && currentStep === MissionStep.PlaceFlagOnMap) {
      handleBackStep(-1)
    } else {
      handleBackStep(1)
    }
  }, [currentStep, handleBackStep, isInEdit])
  const isInMission = useMemo(
    () => currentStep >= MissionStep.selectMissionName,
    [currentStep]
  )
  // ==================== UI toggle control ====================
  // 是否顯示各控制元件，點地圖來toggle
  const [showControl, setShowControl] = useState(true)
  const handleToggleShowControl = useCallback(() => {
    if (isInMission || isInEdit) return // 正在標注中就不能調整
    setShowControl(!showControl)
  }, [isInEdit, isInMission, showControl])

  // ==================== Map viewport control ====================
  const [mapInstance, setMapInstance] = React.useState(null)
  const handleMapOnLoad = useCallback((map) => {
    setMapInstance(map)
  }, [])

  // ==================== Marker control ====================
  const [markerPosition, setMarkerPosition] = useState(
    InitialMissionValue.markerPosition
  )
  const handleSetMarkerPosition = useCallback((event) => {
    setMarkerPosition({
      longitude: event.latLng.lng(),
      latitude: event.latLng.lat()
    })
    // ? marker改地點，street view也要重設？
    setStreetViewPosition({
      longitude: event.latLng.lng(),
      latitude: event.latLng.lat()
    })
  }, [])

  // ==================== Street View control ====================
  const [streetViewUpload, setStreetViewUpload] = useState(false)
  const [streetViewInstance, setStreetViewInstance] = useState(null)
  const [povChanged, setPovChanged] = useState(false)
  const handleStreetViewOnLoad = useCallback((panorama) => {
    setStreetViewInstance(panorama)
  }, [])
  const [streetViewPosition, setStreetViewPosition] = useState(
    InitialMissionValue.streetViewPosition
  )
  const handleChangeStreetViewPosition = useCallback(() => {
    if (!streetViewInstance) return
    setStreetViewPosition({
      longitude: streetViewInstance.position.lng(),
      latitude: streetViewInstance.position.lat()
    })
  }, [streetViewInstance])
  const [streetViewPOV, setStreetViewPOV] = useState(
    InitialMissionValue.streetViewPOV
  )
  const handleChangeStreetViewPOVUndebounced = useCallback(() => {
    if (!streetViewInstance) return
    setPovChanged(true)
    setStreetViewPOV({
      heading: streetViewInstance.pov.heading,
      pitch: streetViewInstance.pov.pitch
    })
  }, [streetViewInstance])
  // ! 因為不debounce的話，街景FPS會很低，所以加入debounce
  const handleChangeStreetViewPOV = useMemo(
    () => debounce(handleChangeStreetViewPOVUndebounced, 200),
    [handleChangeStreetViewPOVUndebounced]
  )
  const handleCompleteStreetView = useCallback(() => {
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
  }, [handleBack, setStep, streetViewInstance])
  const handleCloseStreetView = useCallback(() => {
    setStreetViewPosition({
      longitude: markerPosition.longitude,
      latitude: markerPosition.latitude
    })
    setPovChanged(false)
    setStreetViewPOV(InitialMissionValue.streetViewPOV)
    setStreetViewUpload(false)
    setStep(MissionStep.PlaceFlagOnMap)
  }, [markerPosition, setStep])

  // ==================== Option control ====================
  // TODO 使用 useReducer 優化這坨 useState？

  // --------------- Category ---------------
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    InitialMissionValue.selectedCategoryId
  )
  const handleSetSelectedCategoryId = useCallback((newCategoryId) => {
    setSelectedCategoryId(newCategoryId)
  }, [])

  // --------------- Mission ---------------
  const [selectedMissionId, setSelectedMissionId] = useState(
    InitialMissionValue.selectedMissionId
  )
  // --------------- Discovery ---------------
  const [selectedSubOptionId, setSelectedSubOptionId] = useState(
    InitialMissionValue.selectedSubOptionId
  )
  const [subOptionOtherText, setSubOptionOtherText] = useState(
    InitialMissionValue.subOptionOtherText
  )

  const handleSetSelectedMissionId = useCallback((newMissionId) => {
    setStatus('請選擇')
    setRemindOpen(false)
    setSelectedMissionId(newMissionId)
    // mission和subOption有從屬關係，
    // 修改mission的話，subOption也要被重設
    setSelectedSubOptionId(InitialMissionValue.selectedSubOptionId)
  }, [])

  const handleChangeSubOptionOtherText = useCallback(
    (event) => setSubOptionOtherText(event.target.value),
    []
  )
  // --------------- Description ---------------
  const [moreDescriptionText, setMoreDescriptionText] = useState(
    InitialMissionValue.moreDescriptionText
  )
  const handleChangeMoreDescriptionText = useCallback(
    (event) => setMoreDescriptionText(event.target.value),
    []
  )
  const [photos, setPhotos] = useState(InitialMissionValue.photos)

  // --------------- Location Text ---------------
  const [textLocation, setTextLocation] = useState(
    InitialMissionValue.textLocation
  )
  const handleChangeTextLocation = useCallback((event) => {
    setTextLocation(event.target.value)
  }, [])
  const [floor, setFloor] = useState('無')
  const [status, setStatus] = useState('請選擇')
  const [remindOpen, setRemindOpen] = useState(false)

  // ===================== Loading =======================
  const [loading, setLoading] = useState(false)

  // ========== Token ==========

  const checkNextStep = useCallback(() => {
    if (currentStep === MissionStep.selectMissionName) {
      return missionType !== null
    }
    if (currentStep === MissionStep.SelectMission) {
      return (
        selectedMissionId !== '' && selectedSubOptionId !== ('' || '請選擇')
      )
    }
    return true
  }, [currentStep, missionType, selectedMissionId, selectedSubOptionId])
  const ableToNextStep = useMemo(() => checkNextStep(), [checkNextStep])

  // ==================== Clear ====================
  const clearMissionData = useCallback(() => {
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
    setImageDeleteUrls([])
    setFloor('無')
    setStatus('請選擇')
    setRemindOpen(false)
  }, [markerPosition, setStep])

  // ==================== Step control ====================
  const { enqueueSnackbar } = useSnackbar()

  const handleNext = useCallback(() => {
    // TODO 第一步驟要判斷是否已選擇街景，決定是否直接跳到第三步驟
    if (isInEdit && currentStep === MissionStep.selectMissionName) {
      handleNextStep(2)
    } else {
      handleNextStep(1)
    }
  }, [currentStep, handleNextStep, isInEdit])

  const handleChangeMissionType = useCallback((target) => {
    setMissionType(target)
    setSelectedMissionId('')
    setSelectedSubOptionId('')
  }, [])
  const handleStartMission = useCallback(() => {
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
  }, [mapInstance, setStep])
  const handleStartEdit = useCallback(
    (startTag) => {
      setShowControl(true)
      setMarkerPosition({
        longitude: startTag.position.lng,
        latitude: startTag.position.lat
      })
      setMapCenter(startTag.position)
      setStreetViewPosition({
        longitude: startTag.position.lng,
        latitude: startTag.position.lat
      })
      setMissionType(
        missionInfo.findIndex(
          (element) => element.missionName === startTag.category.missionName
        )
      )
      setSelectedMissionId(startTag.category.subTypeName)
      setSelectedSubOptionId(startTag.category.targetName)
      setStep(MissionStep.selectMissionName)
      setMoreDescriptionText(tagDetail.description)
      setPreviewImages(tagDetail.imageUrl)
      setImageFiles([])
      setImageDeleteUrls([])
      setTextLocation(startTag.locationName)
      setIsInEdit(true)
    },
    [setStep, tagDetail.description, tagDetail.imageUrl]
  )

  const handleCloseMission = useCallback(() => {
    clearMissionData()
    setMissionType(null)
    setStep(MissionStep.Init)
    setIsInEdit(false)
  }, [clearMissionData, setStep])
  const handleCloseEdit = useCallback(() => {
    clearMissionData()
    setMissionType(null)
    setStep(MissionStep.Init)
    setIsInEdit(false)
  }, [clearMissionData, setStep])

  const handleCompleteMission = useCallback(() => {
    setLoading(true)
    let floorNumber = 0
    if (floor === '無') {
      floorNumber = 0
    } else if (floor === 'B1') {
      floorNumber = -1
    } else if (floor === 'B2') {
      floorNumber = -2
    } else {
      floorNumber = floor
    }
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        if (isInEdit) {
          tagUpdate({
            context: {
              headers: {
                authorization: token ? `Bearer ${token}` : ''
              }
            },
            variables: {
              tagId: activeTag.id,
              data: {
                locationName: textLocation,
                category: {
                  missionName: missionInfo[missionType].missionName.toString(),
                  subTypeName: selectedMissionId.toString(),
                  targetName: selectedSubOptionId.toString()
                },
                coordinates: {
                  latitude: streetViewUpload
                    ? streetViewPosition.latitude.toString()
                    : markerPosition.latitude.toString(),
                  longitude: streetViewUpload
                    ? streetViewPosition.longitude.toString()
                    : markerPosition.longitude.toString()
                },
                floor: floorNumber,
                imageDeleteUrls,
                imageUploadNumber: imageFiles.length,
                streetViewInfo: {
                  povHeading: streetViewPOV.heading,
                  povPitch: streetViewPOV.pitch,
                  panoID: '',
                  cameraLatitude: streetViewPosition.latitude,
                  cameraLongitude: streetViewPosition.longitude
                },
                statusName:
                  status !== '請選擇'
                    ? status.toString()
                    : tagDate[missionType][0].statusName
              }
            }
          }).then(
            ({
              data: {
                updateTagData: { imageUploadUrls }
              }
            }) => {
              imageUploadUrls.forEach((url, index) => {
                // const contentType = imageFiles[index].type
                const options = {
                  headers: {
                    'Content-Type': 'application/octet-stream'
                  }
                }
                axios.put(url, imageFiles[index], options).then(() => {
                  refetchUserAddTags()
                  refetchTagDetail()
                  refetch().then(() => {
                    setLoading(false)
                    clearMissionData()
                    setMissionType(null)
                    enqueueSnackbar('更改完成', { variant: 'success' })
                  })
                })
              })
              if (imageUploadUrls.length === 0) {
                refetch().then(() => {
                  setLoading(false)
                  clearMissionData()
                  setMissionType(null)
                  enqueueSnackbar('更改完成', { variant: 'success' })
                })
              }
              refetchUserAddTags()
            }
          )
        } else {
          console.log(status)
          tagAdd({
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
                floor: floorNumber,
                imageUploadNumber: imageFiles.length,
                streetViewInfo: {
                  povHeading: streetViewPOV.heading,
                  povPitch: streetViewPOV.pitch,
                  panoID: '',
                  cameraLatitude: streetViewPosition.latitude,
                  cameraLongitude: streetViewPosition.longitude
                },
                statusName:
                  status !== '請選擇'
                    ? status.toString()
                    : tagDate[missionType][0].statusName
              }
            }
          }).then(
            ({
              data: {
                addNewTagData: { imageUploadUrls }
              }
            }) => {
              imageUploadUrls.forEach((url, index) => {
                // const contentType = imageFiles[index].type
                const options = {
                  headers: {
                    'Content-Type': 'application/octet-stream'
                  }
                }
                axios.put(url, imageFiles[index], options).then(() => {
                  refetch().then(() => {
                    setLoading(false)
                    clearMissionData()
                    setMissionType(null)
                    enqueueSnackbar('標注完成', { variant: 'success' })
                  })
                })
              })
              if (imageUploadUrls.length === 0) {
                refetch().then(() => {
                  setLoading(false)
                  clearMissionData()
                  setMissionType(null)
                  enqueueSnackbar('標注完成', { variant: 'success' })
                })
              }
              refetchUserAddTags()
            }
          )
        }
      })

    // .catch()
    // .finally()
  }, [
    activeTag,
    clearMissionData,
    enqueueSnackbar,
    floor,
    status,
    imageDeleteUrls,
    imageFiles,
    isInEdit,
    markerPosition,
    missionType,
    moreDescriptionText,
    refetch,
    refetchTagDetail,
    refetchUserAddTags,
    selectedMissionId,
    selectedSubOptionId,
    streetViewPOV,
    streetViewPosition,
    streetViewUpload,
    tagAdd,
    tagUpdate,
    textLocation
  ])

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
    setMapCenter,
    floor,
    setFloor,
    status,
    setStatus,
    remindOpen,
    setRemindOpen,
    setImageDeleteUrls,
    imageDeleteUrls,
    handleChangeMissionType
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
