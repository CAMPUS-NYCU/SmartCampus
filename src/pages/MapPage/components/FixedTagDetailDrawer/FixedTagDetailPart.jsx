import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Box, Button } from '@mui/material'
import Grid from '@mui/material/Grid'
import { MAP_PATH } from '../../../../constants/pageUrls'
// import changeImage from '../../../../assets/images/fixedTagChange.svg'
import { useTagValue } from '../../../../utils/contexts/TagContext'

import noImage from '../../../../assets/images/no-image.svg'
import res1StatusType from '../../../../constants/res1StatusType'
import ResearchTextWrapper from '../../../../components/ResarchTextWrapper'

const useStyles = makeStyles((theme) => ({
  img: {
    margin: '0px',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  imgGround: {
    display: 'block',
    width: '100%',
    height: '90%',
    maxHeight: '80px',
    maxWidth: '100%',
    overflow: 'hidden'
  },
  button: {
    background: theme.palette.primary.main,
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '12px',
    borderRadius: '20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
  }
}))

const DetailPartItem = (props) => {
  const classes = useStyles()
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

  return (
    <Grid
      key={tag.id}
      ref={myRef}
      container
      rowSpacing={0}
      paddingX={1}
      style={{
        backgroundColor: isHighlighted ? '#FFF2CF' : 'rgb(238, 238, 238)',
        border: isHighlighted ? 'solid' : 'none',
        borderColor: isHighlighted ? '#FFD771' : 'none',
        borderRadius: '10px',
        marginBottom: '5px',
        width: '98%',
        minHeight: '80px',
        height: 'calc((50vh - 92px)/4)'
      }}
      justifyContent='space-around'
      alignItems='center'
      onClick={() => setHighLightTagId(tag.id)}
    >
      <Grid
        item
        xs={7}
        container
        direction='column'
        justifyContent='space-evenly'
        height='100%'
      >
        {/* 第一排 */}
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
              fontWeight: 'bold',
              fontSize: '12px',
              color: 'rgba(0, 0, 0, 0.6)'
            }}
          >
            {`${tag.category.categoryType}/${tag.category.categoryName}`}
          </Grid>
          <Grid
            item
            style={{
              fontFamily: 'Roboto',
              fontSize: '12px',
              color: 'rgba(0, 0, 0, 0.6)'
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
              color: 'rgba(0, 0, 0, 0.6)'
            }}
          >
            編輯於{' '}
            {moment(tag?.statusHistory?.statusList?.[0]?.createTime).format(
              'YYYY-MM-DD h:mm'
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* 選取按鈕 */}
      <Grid
        item
        xs={2}
        container
        direction='column'
        height='80%'
        justifyContent='flex-end'
      >
        <Button
          id='highlightButton'
          size='small'
          className={classes.button}
          variant='contained'
          onClick={() => {
            history.push(`${MAP_PATH}/tag/${tag.id}`)
          }}
        >
          編輯
        </Button>
      </Grid>

      {/* 圖片 */}
      <Grid item xs={2}>
        <Grid className={classes.imgGround}>
          {tag?.imageUrl?.length === 0 ? (
            <img className={classes.img} alt='fixedTaglist圖片' src={noImage} />
          ) : (
            <img
              className={classes.img}
              alt='fixedTaglist圖片'
              src={tag?.imageUrl[0]}
            />
          )}
        </Grid>
      </Grid>
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
        width: '95%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '0px'
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
