import React, { useState, useRef, useMemo, useEffect } from 'react'

import Typography from '@material-ui/core/Typography'
import NativeSelect from '@material-ui/core/NativeSelect'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Input } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import CreateIcon from '@material-ui/icons/Create'
import StorefrontIcon from '@material-ui/icons/Storefront'
import BusinessIcon from '@material-ui/icons/Business'
import ApartmentIcon from '@material-ui/icons/Apartment'
import DescriptionIcon from '@material-ui/icons/Description'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import tagData from '../../../../../../constants/tagData'
import {
  useMissionValue,
  MissionStep
} from '../../../../../../utils/contexts/MissionContext'
import ImageUpload from '../../../../../../utils/functions/ImageUpload'
import {
  facilitySubType,
  missionName
} from '../../../../../../constants/missionInfo'
import PicturePreview from './PicturePreview'
import CustomButton from '../../../../../../components/CustomButton'

function MissionStep2() {
  const {
    selectedMissionId,
    handleSetSelectedMissionId,
    selectedSubOptionId,
    setSelectedSubOptionId,
    moreDescriptionText,
    handleChangeMoreDescriptionText,
    handleSetStep,
    textLocation,
    handleChangeTextLocation,
    previewImages,
    setPreviewImages,
    missionType,
    floor,
    setFloor,
    status,
    setStatus,
    isInEdit,
    remindOpen
  } = useMissionValue()
  const [locationFocus, setLocationFocus] = useState(true)
  const focusInput = useRef(null)
  const handleChangeFloor = (event) => {
    setFloor(event.target.value)
  }
  const handleChangeStatus = (event) => {
    setStatus(event.target.value)
  }
  const { target = [] } = useMemo(
    () =>
      facilitySubType[missionType].find(
        (facility) => facility.subTypeName === selectedMissionId
      ) || {},
    [missionType, selectedMissionId]
  )
  useEffect(() => {
    if (missionType !== 2) {
      setStatus(tagData[missionType][0].statusName)
    }
  }, [missionType, setStatus])
  useEffect(() => {
    if (missionType === 2) {
      setSelectedSubOptionId(status)
    }
  }, [status, setSelectedSubOptionId, missionType])
  return (
    <>
      <Grid container spacing={3}>
        {/* * ==================== 1.經緯度標註 ==================== */}
        <Grid container item xs={12} justify='space-between' direction='row'>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            width='70%'
            justifyContent='flex-start'
          >
            <LocationOnIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
            <Typography>將座標放在要標註的位置。</Typography>
          </Box>
          <IconButton
            size='small'
            onClick={() => handleSetStep(MissionStep.PlaceFlagOnMap)}
          >
            <CreateIcon fontSize='small' style={{ color: '#E2E2E2' }} />
          </IconButton>
        </Grid>

        {/* * ==================== 2.地點資訊 ==================== */}
        <Grid container item xs={12} justify='space-between' direction='row'>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            width='100vw'
            justifyContent='flex-start'
          >
            <StorefrontIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
            <Input
              id='standard-basic'
              ref={focusInput}
              disableUnderline={locationFocus}
              style={{ width: '100%' }}
              placeholder='輸入地點名稱'
              value={textLocation}
              onChange={handleChangeTextLocation}
              onFocus={() => {
                setLocationFocus(false)
              }}
              onBlur={() => {
                setLocationFocus(true)
              }}
            />

            <IconButton
              size='small'
              onClick={() => {
                focusInput.current.click()
              }}
            >
              <CreateIcon fontSize='small' style={{ color: '#E2E2E2' }} />
            </IconButton>
          </Box>
        </Grid>

        <Grid container item xs={12} justify='space-between' direction='row'>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            width='100vw'
            justifyContent='flex-start'
          >
            <LocationOnIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
            <Box flexGrow={1}>
              <Typography>請選擇目標樓層</Typography>
            </Box>
            <NativeSelect
              native='true'
              onChange={handleChangeFloor}
              value={floor}
              style={{
                direction: 'rtl',
                borderRadius: '5px',
                boxShadow: (() => {
                  if (floor !== 0) {
                    return '0px 2px 4px rgba(0, 0, 0, 0.12)'
                  }
                  return ''
                })(),
                backgroundColor: (() => {
                  if (floor !== 0) {
                    return '#FDCC4F'
                  }
                  return ''
                })()
              }}
            >
              <option value={0}>無</option>
              <option value={-1}>B1</option>
              <option value={-2}>B2</option>
              <option value={1}>1樓</option>
              <option value={2}>2樓</option>
              <option value={3}>3樓</option>
              <option value={4}>4樓</option>
              <option value={5}>5樓</option>
              <option value={6}>6樓</option>
              <option value={7}>7樓</option>
              <option value={8}>8樓</option>
              <option value={9}>9樓</option>
              <option value={10}>10樓</option>
            </NativeSelect>
          </Box>
        </Grid>

        {/* * ==================== 設施類型選擇 ==================== */}
        <Grid container item xs={12} direction='row'>
          <>
            {remindOpen === true && selectedMissionId === '' ? (
              <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                width='1/2'
                justifyContent='flex-start'
                border={1}
                borderColor='error.main'
                borderRadius={6}
              >
                <BusinessIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
                <Typography>{missionName[missionType].missionName}</Typography>
                <Typography>（必填選項）</Typography>
              </Box>
            ) : (
              <>
                <BusinessIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
                <Typography>{missionName[missionType].missionName}</Typography>
              </>
            )}
          </>
        </Grid>
        {facilitySubType[missionType].map((facility) => (
          <Grid key={facility.subTypeName} item xs={4}>
            <CustomButton
              onClick={() => handleSetSelectedMissionId(facility.subTypeName)}
              buttonType={
                selectedMissionId === facility.subTypeName
                  ? 'boxButton_activated'
                  : 'boxButton_inactivated'
              }
              variant='contained'
              size='small'
              fullWidth
            >
              {facility.subTypeName}
            </CustomButton>
          </Grid>
        ))}
        {/* * ==================== 具體設施子類別 ==================== */}
        <Grid container item xs={12} direction='row'>
          <>
            {missionType === 2 ? (
              <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                width='100vw'
                justifyContent='flex-start'
              >
                {remindOpen === true && status === '請選擇' ? (
                  <>
                    <Box
                      display='flex'
                      flexDirection='row'
                      alignItems='center'
                      justifyContent='flex-start'
                      border={1}
                      borderColor='error.main'
                      borderRadius={6}
                      flexGrow={1}
                    >
                      <ApartmentIcon
                        style={{ color: 'FDCC4F', marginRight: '5px' }}
                      />
                      <Typography>請選擇目前狀態（必填選項）</Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <ApartmentIcon
                      style={{ color: 'FDCC4F', marginRight: '5px' }}
                    />
                    <Box flexGrow={1}>
                      <Typography>請選擇目前狀態</Typography>
                    </Box>
                  </>
                )}
                <NativeSelect
                  native='true'
                  value={status}
                  onChange={handleChangeStatus}
                  style={{
                    direction: 'rtl',
                    borderRadius: '5px',
                    boxShadow: (() => {
                      if (status !== '請選擇') {
                        return '0px 2px 4px rgba(0, 0, 0, 0.12)'
                      }
                      return ''
                    })(),
                    backgroundColor: (() => {
                      if (status !== '請選擇') {
                        return '#FDCC4F'
                      }
                      return ''
                    })()
                  }}
                >
                  {selectedMissionId === 'Wi-Fi 訊號' ? (
                    <>
                      <option value='請選擇'>請選擇</option>
                      <option value='良好'>良好</option>
                      <option value='正常'>正常</option>
                      <option value='微弱'>微弱</option>
                    </>
                  ) : (
                    <>
                      <option value='請選擇'>請選擇</option>
                      <option value='人少'>人少</option>
                      <option value='人稍多'>人稍多</option>
                      <option value='擁擠'>擁擠</option>
                    </>
                  )}
                </NativeSelect>
              </Box>
            ) : (
              <>
                {remindOpen === true && selectedSubOptionId === '' ? (
                  <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    width='1/2'
                    justifyContent='flex-start'
                    border={1}
                    borderColor='error.main'
                    borderRadius={6}
                  >
                    <ApartmentIcon
                      style={{ color: 'FDCC4F', marginRight: '5px' }}
                    />
                    <Typography>
                      {missionName[missionType].missionDescription}
                    </Typography>
                    <Typography>（必填選項）</Typography>
                  </Box>
                ) : (
                  <>
                    <ApartmentIcon
                      style={{ color: 'FDCC4F', marginRight: '5px' }}
                    />
                    <Typography>
                      {missionName[missionType].missionDescription}
                    </Typography>
                  </>
                )}
              </>
            )}
          </>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {missionType === 2 ? (
              ''
            ) : (
              <>
                {target.map((discovery) => (
                  <Grid
                    key={discovery.targetName}
                    id={discovery.targetName}
                    item
                    xs={4}
                  >
                    <CustomButton
                      variant='contained'
                      fullWidth
                      size='small'
                      buttonType={
                        selectedSubOptionId === discovery.targetName
                          ? 'boxButton_activated'
                          : 'boxButton_inactivated'
                      }
                      onClick={() =>
                        setSelectedSubOptionId(discovery.targetName)
                      }
                    >
                      {discovery.targetName}
                    </CustomButton>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Grid>
        {!isInEdit && (
          <Grid container item xs={12} direction='row'>
            <DescriptionIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
            <TextField
              name='moreDescriptionText'
              multiline
              id='standard-basic'
              style={{ width: '80vw' }}
              placeholder='詳細說明'
              value={moreDescriptionText}
              onChange={handleChangeMoreDescriptionText}
            />
          </Grid>
        )}

        {/* * ==================== 7.上傳照片 ==================== */}
        <Grid container item xs={12} direction='row' alignItems='center'>
          <AddAPhotoIcon style={{ color: 'FDCC4F', marginRight: '15px' }} />
          <ImageUpload
            setPreviewImages={setPreviewImages}
            previewImages={previewImages}
          />
        </Grid>
        {/* <Grid container item xs={12} direction='row' alignItems='center'>
        <img src={previewImages} />
      </Grid> */}
        <PicturePreview
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
        />
      </Grid>
    </>
  )
}

export default MissionStep2
