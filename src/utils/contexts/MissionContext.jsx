import React, { useContext, useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { gql, useMutation } from '@apollo/client'
import axios from 'axios'
import useStep from '../hooks/useStep'
import { useTagValue } from './TagContext'
import { useUserValue } from './UserContext'
import { DefaultCenter } from '../../constants/mapConstants'
import { findUserLocation } from '../../constants/res1FixedTagMissionConfig'

export const TAG_ADD_MUTATION = gql`
  mutation addNewTagData($input: addTagResearchDataInput!) {
    addNewTagResearchData(data: $input) {
      tagResearch {
        id
        fixedTagId
        locationName
        category {
          categoryType
          categoryName
          categoryDescName
          locationImgUrl
        }
        floor
        status {
          statusName
          statusDescName
        }
      }
      imageUploadNumber
      imageUploadUrls
      imageDeleteStatus
    }
  }
`
export const TAG_UPDATE_MUTATION = gql`
  mutation updateTagData($tagId: ID!, $data: updateTagResearchDataInput!) {
    updateTagResearchData(tagId: $tagId, data: $data) {
      tagResearch {
        id
        locationName
        category {
          categoryType
          categoryName
          categoryDescName
          locationImgUrl
        }
        floor
        status {
          statusName
          statusDescName
        }
      }
      imageUploadNumber
      imageUploadUrls
      imageDeleteStatus
    }
  }
`

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

export const MissionStep = {
  Init: -1,
  PlaceFlagOnMap: 0,
  SelectMission: 1
}

export const MISSION_MAX_STEP = 1
export const MISSION_MIN_STEP = 0
export const MISSION_FIRST_STEP = MissionStep.PlaceFlagOnMap

const InitialMissionValue = {
  currentStep: MissionStep.Init,
  markerPosition: {
    longitude: 0,
    latitude: 0
  },
  textLocation: '',
  photos: []
}

export const MissionContext = React.createContext({
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
  handleChangeTextLocation: () => {},
  setPhotos: () => {},
  handleMapOnLoad: () => {},
  handlePanTo: () => {},
  handleFixedTagPanTo: () => {},
  imageFiles: [],
  setImageFiles: () => {},
  setStep: () => {},
  fixedTagId: null,
  setFixedTagId: () => {},
  locationName: null,
  setLocationName: () => {},
  loading: false,
  ableToNextStep: true,
  ...InitialMissionValue
})

export const MissionContextProvider = ({ children }) => {
  const [tagAdd] = useMutation(TAG_ADD_MUTATION)
  const [tagUpdate] = useMutation(TAG_UPDATE_MUTATION)
  const { token, uid } = useUserValue()

  const [isInEdit, setIsInEdit] = useState(false)

  const [mapCenter, setMapCenter] = useState(DefaultCenter)

  const [fixedTagId, setFixedTagId] = useState(null)

  const [locationName, setLocationName] = useState(null)

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

  const handlePanTo = useCallback(
    (latlng) => {
      const north = mapInstance.getBounds().getNorthEast().lat()
      const south = mapInstance.getBounds().getSouthWest().lat()
      mapInstance.panTo({
        lat: north && south ? latlng.lat - (north - south) / 4 : latlng.lat,
        lng: latlng.lng
      })
    },
    [mapInstance]
  )

  const handleFixedTagPanTo = useCallback(
    (thisLocationName) => {
      const centerLatLng = findUserLocation(thisLocationName).coordinates
      const north = mapInstance.getBounds().getNorthEast().lat()
      const south = mapInstance.getBounds().getSouthWest().lat()
      mapInstance.panTo({
        lat: centerLatLng.latitude - (north - south) / 6,
        lng: centerLatLng.longitude
      })
      mapInstance.setZoom(18)
    },
    [mapInstance]
  )

  // ==================== Marker control ====================
  const [markerPosition, setMarkerPosition] = useState(
    InitialMissionValue.markerPosition
  )
  const handleSetMarkerPosition = useCallback(() => {
    const north = mapInstance.getBounds().getNorthEast().lat()
    const south = mapInstance.getBounds().getSouthWest().lat()
    setMarkerPosition({
      longitude: mapInstance.getCenter().lng(),
      latitude:
        north && south
          ? north - (north - south) / 4
          : mapInstance.getCenter().lat()
    })
  }, [mapInstance])

  // ==================== Option control ====================
  const [photos, setPhotos] = useState(InitialMissionValue.photos)

  // --------------- Location Text ---------------
  const [textLocation, setTextLocation] = useState(
    InitialMissionValue.textLocation
  )
  const handleChangeTextLocation = useCallback((event) => {
    setTextLocation(event.target.value)
  }, [])
  const [floor, setFloor] = useState('')
  const [categoryType, setCategoryType] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [categoryDescName, setCategoryDescName] = useState('')
  const [statusName, setStatusName] = useState('')
  const [statusDescName, setStatusDescName] = useState('')

  // ===================== Loading =======================
  const [loading, setLoading] = useState(false)

  // ========== Token ==========

  const checkNextStep = useCallback(() => {
    return true
  }, [])
  const ableToNextStep = useMemo(() => checkNextStep(), [checkNextStep])

  // ==================== Clear ====================
  const clearMissionData = useCallback(() => {
    setImageFiles([])
    setStep(InitialMissionValue.currentStep)
    setMarkerPosition(InitialMissionValue.markerPosition)
    setPhotos(InitialMissionValue.photos)
    setTextLocation(InitialMissionValue.textLocation)
    setPreviewImages([])
    setImageDeleteUrls([])
    setFloor('')
    setCategoryType('')
    setCategoryName('')
    setCategoryDescName('')
    setStatusName('')
    setStatusDescName('')
  }, [setStep])

  // ==================== Step control ====================
  const { enqueueSnackbar } = useSnackbar()

  const handleBack = useCallback(() => {
    handleBackStep(1)
  }, [handleBackStep])
  const handleNext = useCallback(() => {
    handleNextStep(1)
  }, [handleNextStep])

  const handleStartMission = useCallback(() => {
    setShowControl(true)
    const center = mapInstance.getCenter()
    const north = mapInstance.getBounds().getNorthEast().lat()
    const south = mapInstance.getBounds().getSouthWest().lat()

    setMarkerPosition({
      longitude: center.lng(),
      latitude: north && south ? north - (north - south) / 4 : center.lat()
    })
    setStep(MISSION_FIRST_STEP)
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
      setFloor(tagDetail.floor)
      setStep(MISSION_FIRST_STEP)
      setPreviewImages(tagDetail.imageUrl)
      setImageFiles([])
      setImageDeleteUrls([])
      setTextLocation(startTag.locationName || '')
      setIsInEdit(true)
    },
    [setStep, tagDetail.imageUrl, tagDetail.floor]
  )

  const handleCloseMission = useCallback(() => {
    clearMissionData()
    setStep(MissionStep.Init)
    setIsInEdit(false)
  }, [clearMissionData, setStep])
  const handleCloseEdit = useCallback(() => {
    clearMissionData()
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
      fixedTagId,
      category: {
        categoryType,
        categoryName,
        categoryDescName,
        locationImgUrl: []
      },
      coordinates: {
        latitude: markerPosition.latitude.toString(),
        longitude: markerPosition.longitude.toString()
      },
      imageUploadNumber: imageFiles.length,
      floor,
      statusName,
      statusDescName
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
            updateTagResearchData: { imageUploadUrls }
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
            addNewTagResearchData: { imageUploadUrls }
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
      enqueueSnackbar('地圖標籤上傳完成', { variant: 'success' })
    } catch (err) {
      console.error(err)
      setLoading(false)
      clearMissionData()
      enqueueSnackbar('錯誤', { variant: 'error' })
    }
  }

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
    markerPosition,
    handleSetMarkerPosition,
    textLocation,
    setTextLocation,
    handleChangeTextLocation,
    photos,
    setPhotos,
    handleMapOnLoad,
    handlePanTo,
    handleFixedTagPanTo,
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
    fixedTagId,
    setFixedTagId,
    locationName,
    setLocationName,
    mapCenter,
    setMapCenter,
    floor,
    setFloor,
    categoryType,
    setCategoryType,
    categoryName,
    setCategoryName,
    categoryDescName,
    setCategoryDescName,
    statusName,
    setStatusName,
    statusDescName,
    setStatusDescName,
    setImageDeleteUrls,
    imageDeleteUrls,
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
