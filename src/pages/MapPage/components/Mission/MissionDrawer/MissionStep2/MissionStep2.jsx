import React from 'react'

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
// import Res1StatusType from '../../../../../../constants/Res1StatusType'

import editLocationIcon from '../../../../../../assets/images/res1-editLocation.svg'
import editFloorIcon from '../../../../../../assets/images/res1-editFloor.svg'
// import editAddImgIcon from '../../../../../../assets/images/res1-editAddImg.svg'
import editCategoryDescIcon from '../../../../../../assets/images/res1-editCategoryDesc.svg'
import editCategoryNameIcon from '../../../../../../assets/images/res1-editCategoryName.svg'
import editCategoryTypeIcon from '../../../../../../assets/images/res1-editCategoryType.svg'
import editStatusDescNameIcon from '../../../../../../assets/images/res1-editStatusDescName.svg'
import editStatusNameIcon from '../../../../../../assets/images/res1-editStatusName.svg'

function MissionStep2() {
  const {
    textLocation,
    handleChangeTextLocation,
    previewImages,
    setPreviewImages,
    floor,
    setFloor
  } = useMissionValue()

  const handleChangeFloor = (event) => {
    setFloor(event.target.value)
  }
  return (
    <>
      <Grid container padding={1}>
        {/* 回報地點與樓層 */}
        <Grid container>
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
        <Grid container marginTop={0.5}>
          <Grid item xs={1}>
            <img src={editFloorIcon} alt='回報類別' />
          </Grid>
          <Grid item xs={3}>
            回報樓層
          </Grid>
          <Grid item xs={3}>
            <ResearchTextWrapper isEditable>
              <NativeSelect
                native='true'
                onChange={handleChangeFloor}
                value={floor}
              >
                <option value=''>無</option>
                <option value='B1'>B1</option>
                <option value='B2'>B2</option>
                <option value='1'>1樓</option>
                <option value='2'>2樓</option>
                <option value='3'>3樓</option>
                <option value='4'>4樓</option>
                <option value='5'>5樓</option>
                <option value='6'>6樓</option>
                <option value='7'>7樓</option>
                <option value='8'>8樓</option>
                <option value='9'>9樓</option>
                <option value='10'>10樓</option>
              </NativeSelect>
              {/* {tagDetail.category.categoryType} */}
            </ResearchTextWrapper>
          </Grid>
        </Grid>

        {/* 回報類別 */}
        <Grid container marginTop={0.5}>
          <Grid item xs={1}>
            <img src={editCategoryTypeIcon} alt='回報類別' />
          </Grid>
          <Grid item xs={3}>
            回報類別
          </Grid>
          <Grid item xs={3}>
            <ResearchTextWrapper isEditable>
              <NativeSelect>
                <option value='物體'>物體</option>
                <option value='空間'>空間</option>
              </NativeSelect>
            </ResearchTextWrapper>
          </Grid>
        </Grid>

        {/* 回報項目 */}
        <Grid container marginTop={0.5}>
          <Grid item xs={1}>
            <img src={editCategoryNameIcon} alt='回報項目' />
          </Grid>
          <Grid item xs={3}>
            回報項目
          </Grid>
          <Grid item xs={3}>
            <ResearchTextWrapper isEditable>
              <NativeSelect>
                <option value='飲水機'>飲水機</option>
                <option value='停車位'>停車位</option>
              </NativeSelect>
            </ResearchTextWrapper>
          </Grid>
        </Grid>

        {/* 項目描述 */}
        <Grid container marginTop={0.5}>
          <Grid item xs={1}>
            <img src={editCategoryDescIcon} alt='項目描述' />
          </Grid>
          <Grid item xs={3}>
            項目描述
          </Grid>
          <Grid item xs={4}>
            <ResearchTextWrapper isEditable>
              <NativeSelect>
                <option value='飲水機1'>飲水機1</option>
                <option value='飲水機2'>飲水機2</option>
              </NativeSelect>
            </ResearchTextWrapper>
          </Grid>
        </Grid>

        {/* 回報狀態 */}
        <Grid container marginTop={0.5}>
          <Grid item xs={1}>
            <img src={editStatusNameIcon} alt='回報狀態' />
          </Grid>
          <Grid item xs={3}>
            回報狀態
          </Grid>
          <Grid item xs={4}>
            <ResearchTextWrapper isEditable>
              <NativeSelect>
                <option value='清潔狀態'>清潔狀態</option>
              </NativeSelect>
            </ResearchTextWrapper>
          </Grid>
        </Grid>

        {/* 狀態描述；唯一可供編輯的欄位 */}
        <Grid container marginTop={0.5}>
          <Grid item xs={1}>
            <img src={editStatusDescNameIcon} alt='狀態描述' />
          </Grid>
          <Grid item xs={3}>
            狀態描述
          </Grid>
          <Grid item xs={4}>
            <ResearchTextWrapper isEditable>
              <FormControl fullWidth>
                {/* <NativeSelect
                  defaultValue={tagDetail.status.statusDescName}
                  value={selectedStatusDesc}
                  onChange={handleSelectChange}
                >
                  {thisStatusType?.statusOptions?.map((currentValue) => {
                    return (
                      <option key={currentValue} value={currentValue} style={{ textAlign: 'center' }}>
                        {currentValue}
                      </option>
                    )
                  })}
                </NativeSelect> */}
              </FormControl>
            </ResearchTextWrapper>
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
