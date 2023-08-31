import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Box, Button, ButtonBase, Paper } from '@mui/material'
import Grid from '@mui/material/Grid'
import { MAP_PATH } from '../../../../constants/pageUrls'
// import changeImage from '../../../../assets/images/fixedTagChange.svg'
import { useTagValue } from '../../../../utils/contexts/TagContext'

import res1StatusType from '../../../../constants/res1StatusType'
import ResearchTextWrapper from '../../../../components/ResarchTextWrapper'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
})

const DetailPartItem = (props) => {
  const { tag } = props
  const history = useHistory()
  const myRef = React.useRef(null)

  const [thisStatusType, setThisStatusType] = useState({})
  useEffect(() => {
    for (let i = 0; i < res1StatusType.length; i += 1) {
      if (tag.status.statusName === res1StatusType[i].status) {
        setThisStatusType(res1StatusType[i])
      }
    }
  }, [tag])

  const { highlightTagId, setHighLightTagId } = useTagValue()
  const isHighlighted = tag.id === highlightTagId
  React.useEffect(() => {
    if (isHighlighted) {
      myRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
    }
  }, [isHighlighted])

  console.log(tag)

  return (
    <Grid
      key={tag.id}
      ref={myRef}
      container
      sx={12}
      rowSpacing={0}
      paddingX={1}
      style={{
        backgroundColor: isHighlighted ? '#97948E' : '#EEEEEE',
        borderRadius: '10px',
        margin: '5px',
        width: '98%',
        minHeight: '80px',
        height: 'calc((50vh - 120px)/4)'
      }}
      justifyContent='space-around'
      alignItems='center'
    >
      <ButtonBase
        sx={12}
        style={{
          width: '100%'
        }}
        onClick={() => setHighLightTagId(tag.id)}
      >
        <Grid item sx={8} container direction='column' spacing={1} mr={1}>
          {/* 第一排 */}
          <Grid
            container
            item
            columnSpacing={0.5}
            justifyContent='flex-start'
            alignItems='center'
          >
            <Grid item>
              {`${tag.category.categoryType}/${tag.category.categoryName}`}
            </Grid>
            <Grid
              item
              style={{
                fontFamily: 'Roboto',
                fontStyle: 'light',
                fontSize: '12px',
                color: 'gray'
              }}
            >
              {tag.category.categoryDescName}
            </Grid>
          </Grid>

          {/* 第二排 */}
          <Grid
            container
            item
            columnSpacing={0.5}
            justifyContent='flex-start'
            alignItems='center'
          >
            <Grid
              item
              style={{
                fontFamily: 'Roboto',
                fontStyle: 'light',
                fontSize: '12px',
                lineHeight: '12px',
                letterSpacing: '0.75px',
                textTransform: 'uppercase'
              }}
            >
              <ResearchTextWrapper>{tag.floor}</ResearchTextWrapper>
            </Grid>
            <Grid
              item
              style={{
                fontFamily: 'Roboto',
                fontStyle: 'light',
                fontSize: '12px',
                lineHeight: '12px',
                letterSpacing: '0.75px',
                textTransform: 'uppercase'
              }}
            >
              <ResearchTextWrapper bgcolor={thisStatusType.statusColor}>
                {`${tag.status.statusName}：${tag.status.statusDescName}`}
              </ResearchTextWrapper>
            </Grid>
          </Grid>

          {/* 第三排 */}
          <Grid
            container
            item
            columnSpacing={1}
            justifyContent='space-between'
            alignItems='center'
          >
            <Grid
              item
              style={{
                fontFamily: 'Roboto',
                fontStyle: 'light',
                fontSize: '12px',
                color: 'gray'
              }}
            >
              編輯於{' '}
              {moment(tag?.statusHistory?.statusList?.[0]?.createTime).format(
                'YYYY-MM-DD h:mm'
              )}
            </Grid>

            <Grid item>
              <Button
                id='highlightButton'
                size='small'
                style={{
                  background: '#FDCC4F',
                  fontSize: '12px',
                  borderRadius: '20px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
                }}
                variant='contained'
                onClick={() => {
                  history.push(`${MAP_PATH}/tag/${tag.id}`)
                }}
              >
                選取
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={3}>
          <Paper sx={{ width: 70, height: 70 }}>
            <Img alt='fixTaglist圖片' src={tag?.category?.locationImgUrl} />
          </Paper>
        </Grid>
      </ButtonBase>
    </Grid>
  )
}

const DetailPart = (props) => {
  const { tags } = props
  return (
    <Box
      display='flex'
      flexDirection='column'
      m={2}
      style={{
        overflowX: 'hidden',
        overflowY: 'scroll',
        height: '80%',
        width: '90%',
        marginTop: '10px'
      }}
    >
      {tags.map((tag) => (
        <DetailPartItem key={tag.id} tag={tag} />
      ))}
    </Box>
  )
}

DetailPart.propTypes = {
  tags: PropTypes.array.isRequired
}

export default DetailPart
