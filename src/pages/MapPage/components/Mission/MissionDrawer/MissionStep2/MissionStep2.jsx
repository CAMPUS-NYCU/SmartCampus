import React, { useEffect, useState } from 'react'

// import Typography from '@mui/material/Typography'
import NativeSelect from '@mui/material/NativeSelect'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
// import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { useMissionValue } from '../../../../../../utils/contexts/MissionContext'
import ImageUpload from '../../../../../../utils/functions/ImageUpload'
import PicturePreview from './PicturePreview'

import ResearchTextWrapper from '../../../../../../components/ResarchTextWrapper'
import res1StatusType from '../../../../../../constants/res1StatusType'

import editLocationIcon from '../../../../../../assets/images/res1-editLocation.svg'
import editFloorIcon from '../../../../../../assets/images/res1-editFloor.svg'
// import editAddImgIcon from '../../../../../../assets/images/res1-editAddImg.svg'
import editCategoryDescIcon from '../../../../../../assets/images/res1-editCategoryDesc.svg'
import editCategoryNameIcon from '../../../../../../assets/images/res1-editCategoryName.svg'
import editCategoryTypeIcon from '../../../../../../assets/images/res1-editCategoryType.svg'
import editStatusDescNameIcon from '../../../../../../assets/images/res1-editStatusDescName.svg'
import editStatusNameIcon from '../../../../../../assets/images/res1-editStatusName.svg'

import { findCorrespondingOptions } from '../../../../../../constants/res1CreateOptions'

function MissionStep2() {
  const {
    textLocation,
    handleChangeTextLocation,
    previewImages,
    setPreviewImages,
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
    locationName
  } = useMissionValue()

  const [thisFloorOption, setThisFloorOption] = useState({})
  const handleChangeFloor = (event) => {
    setFloor(event.target.value)
    setCategoryType('')
    setCategoryName('')
    setCategoryDescName('')
    setStatusName('')
    setStatusDescName('')

    for (let i = 0; i < thisLocationOptions?.floorOptions?.length; i += 1) {
      if (thisLocationOptions.floorOptions[i].floor === event.target.value) {
        setThisFloorOption(thisLocationOptions.floorOptions[i])
        console.log(thisLocationOptions.floorOptions[i])
      }
    }
  }

  const handleChangeCategoryType = (event) => {
    setCategoryType(event.target.value)
    setCategoryName('')
    setCategoryDescName('')
    setStatusName('')
    setStatusDescName('')
  }

  const handleChangeCategoryName = (event) => {
    setCategoryName(event.target.value)
    setCategoryDescName('')
    setStatusName('')
    setStatusDescName('')
  }

  const handleChangeCategoryDescName = (event) => {
    setCategoryDescName(event.target.value)
    setStatusName('')
    setStatusDescName('')
  }

  const handleChangeStatusName = (event) => {
    setStatusName(event.target.value)
    setStatusDescName('')
  }

  const handleChangeStatusDescName = (event) => {
    setStatusDescName(event.target.value)
  }

  const [thisStatusType, setThisStatusType] = useState({})
  useEffect(() => {
    if (statusName) {
      res1StatusType.map((item) => {
        if (item.status === statusName) {
          setThisStatusType(item)
        }
        return null
      })
    } else {
      setThisStatusType({})
    }
  }, [statusName])

  const [thisLocationOptions, setThisLocationOptions] = useState([])
  useEffect(() => {
    setThisLocationOptions(findCorrespondingOptions(locationName))
  }, [locationName])

  return (
    <>
      <Grid container direction='column' rowSpacing={1}>
        {/* 回報地點與樓層 */}
        <Grid container item>
          <Grid item xs={1}>
            <img src={editLocationIcon} alt='回報地點' />
          </Grid>
          <Grid item xs={3}>
            回報地點
          </Grid>
          <TextField
            id='standard-basic'
            sx={{
              input: { fontSize: '12px', color: '#777777' }
            }}
            placeholder='輸入地點名稱'
            value={textLocation}
            onChange={handleChangeTextLocation}
            variant='standard'
          />
        </Grid>

        {/* 回報樓層 */}
        <Grid container item>
          <Grid item xs={1}>
            <img src={editFloorIcon} alt='回報類別' />
          </Grid>
          <Grid item xs={3}>
            回報樓層
          </Grid>
          <Grid item xs>
            <ResearchTextWrapper isEditable>
              <FormControl fullWidth>
                <NativeSelect onChange={handleChangeFloor} value={floor}>
                  <option value='' style={{ textAlign: 'center' }}>
                    請選擇
                  </option>
                  {thisLocationOptions?.floorOptions?.map((item) => {
                    return (
                      <option
                        key={item.floor}
                        value={item.floor}
                        style={{ textAlign: 'center' }}
                      >
                        {`${item.floor}F`}
                      </option>
                    )
                  })}
                </NativeSelect>
              </FormControl>
            </ResearchTextWrapper>
          </Grid>
        </Grid>

        {/* 回報類別 */}
        <Grid container item>
          <Grid item xs={1}>
            <img src={editCategoryTypeIcon} alt='回報類別' />
          </Grid>
          <Grid item xs={3}>
            回報類別
          </Grid>
          <Grid item xs>
            {floor === '' ? (
              <ResearchTextWrapper />
            ) : (
              <ResearchTextWrapper isEditable>
                <FormControl fullWidth>
                  <NativeSelect
                    onChange={handleChangeCategoryType}
                    value={categoryType}
                  >
                    <option value='' style={{ textAlign: 'center' }}>
                      請選擇
                    </option>
                    {thisFloorOption?.reportableCateType?.map((item) => {
                      return (
                        <option
                          key={item}
                          value={item}
                          style={{ textAlign: 'center' }}
                        >
                          {item}
                        </option>
                      )
                    })}
                  </NativeSelect>
                </FormControl>
              </ResearchTextWrapper>
            )}
          </Grid>
        </Grid>

        {/* 回報項目 */}
        <Grid container item>
          <Grid item xs={1}>
            <img src={editCategoryNameIcon} alt='回報項目' />
          </Grid>
          <Grid item xs={3}>
            回報項目
          </Grid>
          <Grid item xs>
            {categoryType === '' ? (
              <ResearchTextWrapper />
            ) : (
              <ResearchTextWrapper isEditable>
                <FormControl fullWidth>
                  <NativeSelect
                    onChange={handleChangeCategoryName}
                    value={categoryName}
                  >
                    <option value='' style={{ textAlign: 'center' }}>
                      請選擇
                    </option>
                    {thisLocationOptions?.uniqueCateOfFloors?.map((item) => {
                      if (
                        item.categoryType === categoryType &&
                        item.floor === floor
                      ) {
                        return (
                          <option
                            key={item.categoryName}
                            value={item.categoryName}
                            style={{ textAlign: 'center' }}
                          >
                            {item.categoryName}
                          </option>
                        )
                      }
                      return null
                    })}
                  </NativeSelect>
                </FormControl>
              </ResearchTextWrapper>
            )}
          </Grid>
        </Grid>

        {/* 項目描述 */}
        <Grid container item>
          <Grid item xs={1}>
            <img src={editCategoryDescIcon} alt='項目描述' />
          </Grid>
          <Grid item xs={3}>
            項目描述
          </Grid>
          <Grid item xs>
            {categoryName === '' ? (
              <ResearchTextWrapper />
            ) : (
              <ResearchTextWrapper isEditable>
                <FormControl fullWidth>
                  <NativeSelect
                    onChange={handleChangeCategoryDescName}
                    value={categoryDescName}
                  >
                    <option value='' style={{ textAlign: 'center' }}>
                      請選擇
                    </option>
                    {thisLocationOptions?.optionData?.map((item) => {
                      if (
                        item.categoryType === categoryType &&
                        item.floor === floor &&
                        item.categoryName === categoryName
                      ) {
                        return (
                          <option
                            key={item.categoryDescName}
                            value={item.categoryDescName}
                            style={{ textAlign: 'center' }}
                          >
                            {item.categoryDescName}
                          </option>
                        )
                      }
                      return null
                    })}
                  </NativeSelect>
                </FormControl>
              </ResearchTextWrapper>
            )}
          </Grid>
        </Grid>

        {/* 回報狀態 */}
        <Grid container item>
          <Grid item xs={1}>
            <img src={editStatusNameIcon} alt='回報狀態' />
          </Grid>
          <Grid item xs={3}>
            回報狀態
          </Grid>
          <Grid item xs>
            {categoryDescName === '' ? (
              <ResearchTextWrapper />
            ) : (
              <ResearchTextWrapper isEditable>
                <FormControl fullWidth>
                  <NativeSelect
                    onChange={handleChangeStatusName}
                    value={statusName}
                  >
                    <option value='' style={{ textAlign: 'center' }}>
                      請選擇
                    </option>
                    {res1StatusType?.map((item) => {
                      if (item.categoryType === categoryType) {
                        return (
                          <option
                            key={item.status}
                            value={item.status}
                            style={{ textAlign: 'center' }}
                          >
                            {item.status}
                          </option>
                        )
                      }
                      return null
                    })}
                  </NativeSelect>
                </FormControl>
              </ResearchTextWrapper>
            )}
          </Grid>
        </Grid>

        {/* 狀態描述 */}
        <Grid container item>
          <Grid item xs={1}>
            <img src={editStatusDescNameIcon} alt='狀態描述' />
          </Grid>
          <Grid item xs={3}>
            狀態描述
          </Grid>
          <Grid item xs>
            {statusName === '' ? (
              <ResearchTextWrapper />
            ) : (
              <ResearchTextWrapper isEditable>
                <FormControl fullWidth>
                  <NativeSelect
                    onChange={handleChangeStatusDescName}
                    value={statusDescName}
                  >
                    <option value='' style={{ textAlign: 'center' }}>
                      請選擇
                    </option>
                    {thisStatusType?.statusOptions?.map((item) => {
                      return (
                        <option
                          key={item}
                          value={item}
                          style={{ textAlign: 'center' }}
                        >
                          {item}
                        </option>
                      )
                    })}
                  </NativeSelect>
                </FormControl>
              </ResearchTextWrapper>
            )}
          </Grid>
        </Grid>

        <Grid container item xs={12} direction='row' alignItems='center'>
          <AddAPhotoIcon style={{ color: 'FDCC4F', marginRight: '15px' }} />
          <ImageUpload
            setPreviewImages={setPreviewImages}
            previewImages={previewImages}
          />
        </Grid>
        <PicturePreview
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
        />
      </Grid>
    </>
  )
}

export default MissionStep2
