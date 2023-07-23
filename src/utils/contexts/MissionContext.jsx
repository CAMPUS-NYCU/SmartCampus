import React, { useContext, useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { gql, useMutation } from '@apollo/client'
import axios from 'axios'
import useStep from '../hooks/useStep'
import { missionInfo } from '../../constants/missionInfo'
import { useTagValue } from './TagContext'
import { useUserValue } from './UserContext'
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

export const MISSION_MAX_STEP = 1
export const MISSION_MIN_STEP = 0
export const MISSION_NUM_STEPS = 4

export const floorMapping = [
  '無',
  'B1',
  'B2',
  '1樓',
  '2樓',
  '3樓',
  '4樓',
  '5樓',
  '6樓',
  '7樓',
  '8樓',
  '9樓',
  '10樓'
]

// 特殊的 selectedSubOptionId 數值，
// 當 user 要手動輸入 subOption 的文字框時，selectedSubOptionId 會是這個
export const SubOptionOther = Symbol('SubOptionOther')

export const MissionStep = {
  Init: -1,
  PlaceFlagOnMap: 0,
  SelectMission: 1
}

const InitialMissionValue = {
  currentStep: MissionStep.Init,
  markerPosition: {
    longitude: 0,
    latitude: 0
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
  ...InitialMissionValue
})

export const MissionContextProvider = ({ children }) => {
  const [tagAdd] = useMutation(TAG_ADD_MUTATION)
  const [tagUpdate] = useMutation(TAG_UPDATE_MUTATION)
  const { token, uid } = useUserValue()

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
  const { activeTag, tagDetail, getUserTagList } = useTagValue()
  const handleBack = useCallback(() => {
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
    () => currentStep !== MissionStep.Init,
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
  const handleSetMarkerPosition = useCallback(() => {
    setMarkerPosition({
      longitude: mapInstance.getCenter().lng(),
      latitude: mapInstance.getCenter().lat()
    })
  }, [mapInstance])

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

  const handleSetSelectedMissionId = useCallback(
    (newMissionId) => {
      if (missionType === 2) {
        setStatus('請選擇')
      } else {
        setSelectedSubOptionId(InitialMissionValue.selectedSubOptionId)
      }
      setRemindOpen(false)
      setSelectedMissionId(newMissionId)
    },
    [missionType]
  )

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
  const [floor, setFloor] = useState(0)
  const [status, setStatus] = useState('請選擇')
  const [remindOpen, setRemindOpen] = useState(false)

  // ===================== Loading =======================
  const [loading, setLoading] = useState(false)

  // ========== Token ==========

  const checkNextStep = useCallback(() => {
    if (currentStep === MissionStep.SelectMission) {
      if (missionType === 2) {
        return selectedMissionId !== '' && selectedSubOptionId !== '請選擇'
      }
      return selectedMissionId !== '' && selectedSubOptionId !== ''
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
    setPreviewImages([])
    setImageDeleteUrls([])
    setFloor(0)
    setStatus('請選擇')
    setRemindOpen(false)
  }, [setStep])

  // ==================== Step control ====================
  const { enqueueSnackbar } = useSnackbar()

  const handleNext = useCallback(() => {
    handleNextStep(1)
  }, [handleNextStep])

  const handleChangeMissionType = useCallback(
    (target) => {
      if (target !== missionType) {
        setSelectedMissionId('')
        setSelectedSubOptionId('')
      }
      setMissionType(target)
      handleNext()
    },
    [handleNext, missionType]
  )
  const handleStartMission = useCallback(() => {
    setShowControl(true)
    const center = mapInstance.getCenter()
    setMarkerPosition({
      longitude: center.lng(),
      latitude: center.lat()
    })
    setStep(MissionStep.PlaceFlagOnMap)
  }, [mapInstance, setStep])
  const handleStartEdit = useCallback(
    (startTag) => {
      setShowControl(true)
      setMarkerPosition({
        latitude: parseFloat(startTag.coordinates.latitude),
        longitude: parseFloat(startTag.coordinates.longitude)
      })
      setMapCenter({
        lat: parseFloat(startTag.coordinates.latitude),
        lng: parseFloat(startTag.coordinates.longitude)
      })
      const tagMissionType = missionInfo.findIndex(
        (element) => element.missionName === startTag.category.missionName
      )
      setMissionType(tagMissionType)
      if (tagMissionType === 2) {
        setStatus(startTag.category.targetName)
      }
      setFloor(tagDetail.floor)
      setSelectedMissionId(startTag.category.subTypeName)
      setSelectedSubOptionId(startTag.category.targetName)
      setStep(MissionStep.PlaceFlagOnMap)
      setMoreDescriptionText(tagDetail.description)
      setPreviewImages(tagDetail.imageUrl)
      setImageFiles([])
      setImageDeleteUrls([])
      setTextLocation(startTag.locationName || '')
      setIsInEdit(true)
    },
    [setStep, tagDetail.description, tagDetail.imageUrl, tagDetail.floor]
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

  const handleUploadImages = useCallback(
    async (imageUrlList) => {
      try {
        const requests = imageUrlList.map((url, index) => {
          const options = {
            headers: {
              'Content-Type': 'application/octet-stream'
            }
          }
          return axios.put(url, imageFiles[index], options)
        })
        await Promise.all(requests)
      } catch (err) {
        enqueueSnackbar('圖片上傳失敗', { variant: 'error' })
      }
    },
    [imageFiles, enqueueSnackbar]
  )

  const handleCompleteMission = async () => {
    setLoading(true)
    const payload = {
      locationName: textLocation,
      category: {
        missionName: missionInfo[missionType].missionName.toString(),
        subTypeName: selectedMissionId.toString(),
        targetName: selectedSubOptionId.toString()
      },
      coordinates: {
        latitude: markerPosition.latitude.toString(),
        longitude: markerPosition.longitude.toString()
      },
      description: moreDescriptionText,
      floor: Number(floor),
      imageUploadNumber: imageFiles.length,
      statusName: status.toString()
    }
    const context = {
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    }
    try {
      if (isInEdit) {
        const {
          data: {
            updateTagData: { imageUploadUrls }
          }
        } = await tagUpdate({
          context,
          variables: {
            tagId: activeTag.id,
            data: { ...payload, imageDeleteUrls }
          }
        })
        await handleUploadImages(imageUploadUrls)
      } else {
        const {
          data: {
            addNewTagData: { imageUploadUrls }
          }
        } = await tagAdd({
          context,
          variables: {
            input: payload
          }
        })
        await handleUploadImages(imageUploadUrls)
      }
      getUserTagList({ variables: { uid } })
      setLoading(false)
      clearMissionData()
      setMissionType(null)
      enqueueSnackbar('地圖標籤上傳完成', { variant: 'success' })
    } catch (err) {
      console.error(err)
      setLoading(false)
      clearMissionData()
      setMissionType(null)
      enqueueSnackbar('錯誤', { variant: 'error' })
    }
  }

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
    handleChangeMissionType,
    mapInstance
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
