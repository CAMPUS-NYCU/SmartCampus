import React, { useState, useEffect, Fragment } from 'react'
import {
  Box,
  Button,
  DialogActions,
  Dialog,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  FormControl
} from '@mui/material'
import PropTypes from 'prop-types'
import CustomDrawer from '../../../../components/CustomDrawer'
import { useUpdateTagStatus } from '../../../../utils/Mutation/updateTagStatus'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import { useUserValue } from '../../../../utils/contexts/UserContext'
import ResearchTextWrapper from '../../../../components/ResarchTextWrapper'
import Res1StatusType from '../../../../constants/Res1StatusType'

import editLocationIcon from '../../../../assets/images/res1-editLocation.svg'
// import editAddImgIcon from '../../../../assets/images/res1-editAddImg.svg'
import editCategoryDescIcon from '../../../../assets/images/res1-editCategoryDesc.svg'
import editCategoryNameIcon from '../../../../assets/images/res1-editCategoryName.svg'
import editCategoryTypeIcon from '../../../../assets/images/res1-editCategoryType.svg'
import editStatusDescNameIcon from '../../../../assets/images/res1-editStatusDescName.svg'
import editStatusNameIcon from '../../../../assets/images/res1-editStatusName.svg'

function ChangeStatus(props) {
  const { stateDrawer, tagDetail, setStateDrawer } = props
  const { fetchTagDetail } = useTagValue()
  const { token } = useUserValue()
  const [loading, setLoading] = useState(false)

  const [thisStatusType, setThisStatusType] = useState({})
  useEffect(() => {
    for (let i = 0; i < Res1StatusType.length; i += 1) {
      if (tagDetail.status.statusName === Res1StatusType[i].status) {
        setThisStatusType(Res1StatusType[i])
      }
    }
  }, [tagDetail])

  const [selectedStatusDesc, setSelectedStatusDesc] = useState('')
  useEffect(() => {
    setSelectedStatusDesc(tagDetail.status.statusDescName)
  }, [tagDetail, stateDrawer])
  const handleSelectChange = (event) => {
    setSelectedStatusDesc(event.target.value)
  }

  const handleDrawerClose = () => {
    setStateDrawer(false)
  }
  const { updateStatus } = useUpdateTagStatus()
  const handleDrawerComplete = async () => {
    setLoading(true)
    if (token) {
      try {
        await updateStatus({
          context: {
            headers: {
              authorization: token ? `Bearer ${token}` : ''
            }
          },
          variables: {
            tagId: tagDetail.id,
            data: {
              locationName: tagDetail.locationName,
              category: {
                categoryType: tagDetail.category.categoryType,
                categoryName: tagDetail.category.categoryName,
                categoryDescName: tagDetail.category.categoryDescName,
                locationImgUrl: tagDetail.category.locationImgUrl
              },
              statusName: tagDetail.status.statusName,
              statusDescName: selectedStatusDesc
            }
          }
        })
        await fetchTagDetail()
        setLoading(false)
        setStateDrawer(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
        setStateDrawer(false)
      }
    }
  }

  return (
    <>
      <CustomDrawer
        open={stateDrawer}
        handleClose={handleDrawerClose}
        closeButton
        title='更新回報資訊'
      >
        <Box
          display='flex'
          width='100%'
          flexDirection='column'
          justifyContent='space-around'
        >
          <Grid container padding={2}>
            {/* 回報地點與樓層 */}
            <Grid container>
              <Grid item xs={1} ml={1}>
                <img src={editLocationIcon} alt='回報地點' />
              </Grid>
              <Grid item xs={3}>
                回報地點
              </Grid>
              <Grid item xs={4} mr={1}>
                <ResearchTextWrapper>
                  {tagDetail.locationName}
                </ResearchTextWrapper>
              </Grid>
              <Grid item xs={1.5}>
                <ResearchTextWrapper>
                  {`${tagDetail.floor}樓`}
                </ResearchTextWrapper>
              </Grid>
            </Grid>

            {/* 回報類別 */}
            <Grid container marginTop={0.5}>
              <Grid item xs={1} ml={1}>
                <img src={editCategoryTypeIcon} alt='回報類別' />
              </Grid>
              <Grid item xs={3}>
                回報類別
              </Grid>
              <Grid item xs={2}>
                <ResearchTextWrapper>
                  {tagDetail.category.categoryType}
                </ResearchTextWrapper>
              </Grid>
            </Grid>

            {/* 回報項目 */}
            <Grid container marginTop={0.5}>
              <Grid item xs={1} ml={1}>
                <img src={editCategoryNameIcon} alt='回報項目' />
              </Grid>
              <Grid item xs={3}>
                回報項目
              </Grid>
              <Grid item xs={2}>
                <ResearchTextWrapper>
                  {tagDetail.category.categoryName}
                </ResearchTextWrapper>
              </Grid>
            </Grid>

            {/* 項目描述 */}
            <Grid container marginTop={0.5}>
              <Grid item xs={1} ml={1}>
                <img src={editCategoryDescIcon} alt='項目描述' />
              </Grid>
              <Grid item xs={3}>
                項目描述
              </Grid>
              <Grid item xs={2}>
                <ResearchTextWrapper>
                  {tagDetail.category.categoryDescName}
                </ResearchTextWrapper>
              </Grid>
            </Grid>

            {/* 回報狀態 */}
            <Grid container marginTop={0.5}>
              <Grid item xs={1} ml={1}>
                <img src={editStatusNameIcon} alt='回報狀態' />
              </Grid>
              <Grid item xs={3}>
                回報狀態
              </Grid>
              <Grid item xs={3}>
                <ResearchTextWrapper bgcolor={thisStatusType.statusColor}>
                  {tagDetail.status.statusName}
                </ResearchTextWrapper>
              </Grid>
            </Grid>

            {/* 狀態描述；唯一可供編輯的欄位 */}
            <Grid container marginTop={0.5}>
              <Grid item xs={1} ml={1}>
                <img src={editStatusDescNameIcon} alt='狀態描述' />
              </Grid>
              <Grid item xs={3}>
                狀態描述
              </Grid>
              <Grid item xs={4}>
                <ResearchTextWrapper bgcolor='#FDCC4F'>
                  <FormControl fullWidth>
                    <Select
                      defaultValue={tagDetail.status.statusDescName}
                      value={selectedStatusDesc}
                      onChange={handleSelectChange}
                    >
                      {thisStatusType?.statusOptions?.map((currentValue) => {
                        return (
                          <MenuItem key={currentValue} value={currentValue}>
                            {currentValue}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </ResearchTextWrapper>
              </Grid>
            </Grid>
          </Grid>

          <DialogActions>
            <Button color='primary' onClick={() => handleDrawerComplete()}>
              確定
            </Button>
          </DialogActions>
        </Box>
      </CustomDrawer>
      <Dialog
        open={loading}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            width: '50px',
            height: '50px'
          }
        }}
      >
        <CircularProgress />
      </Dialog>
    </>
  )
}

ChangeStatus.propTypes = {
  stateDrawer: PropTypes.bool.isRequired,
  tagDetail: PropTypes.object.isRequired,
  setStateDrawer: PropTypes.func.isRequired,
  status: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ChangeStatus
