import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@mui/material'
import Grid from '@mui/material/Grid'
import changeImage from '../../../../assets/images/fixedTagChange.svg'
import CustomButton from '../../../../components/CustomButton'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import { fixedTagContext } from '../../../../constants/fixedTagContext'

const DetailPartItem = (props) => {
  const { tag } = props

  return (
    <Grid
      key={tag.id}
      container
      spacing={2}
      style={{
        backgroundColor: '#EEEEEE',
        borderRadius: '10px',
        margin: '5px',
        width: '98%'
      }}
      justifyContent='center'
      alignItems='center'
    >
      <Grid
        item
        xs={6}
        style={{
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '14px',
          lineHeight: '12px',
          letterSpacing: '0.75px',
          textTransform: 'uppercase'
        }}
      >
        {tag.locationName}
      </Grid>
      <Grid
        item
        xs={4}
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
          id='changeStatusButton'
          size='small'
          style={{
            background: '#FDCC4F',
            fontSize: '12px',
            borderRadius: '20px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
          }}
          variant='contained'
          onClick={() => {
            alert('[TODO]: 編輯')
          }}
        >
          <img src={changeImage} alt='' />
          &nbsp;編輯
        </Button>
      </Grid>
    </Grid>
  )
}

const DetailPart = (props) => {
  const { activeFixedTag } = props
  const [floor, setFloor] = useState(
    activeFixedTag.locationName === '圖書館' ? '2F' : '1F'
  )

  const { fixedtagDetail } = useTagValue()
  const { information } = useMemo(
    () =>
      fixedTagContext.find(
        (fixedtagfloor) =>
          fixedtagfloor.locationName === activeFixedTag.locationName
      ) || {},
    [activeFixedTag]
  )
  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        flexDirection='row'
        m={2}
        style={{
          overflowY: 'hidden',
          overflowX: 'scroll',
          height: '15%',
          width: '90%',
          margin: '2px'
        }}
      >
        {information?.map((discovery) => (
          <CustomButton
            key={discovery.floor}
            buttonType={
              discovery.floor === floor
                ? 'fixedTagChosefloorButton'
                : 'fixedTagfloorButton'
            }
            onClick={() => setFloor(discovery.floor)}
          >
            {discovery.floor}
          </CustomButton>
        ))}
      </Box>
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
        {fixedtagDetail.tags.length > 0
          ? fixedtagDetail.tags.map((tag) => (
              <DetailPartItem key={tag.id} tag={tag} />
            ))
          : '[TODO]: 無資料'}
      </Box>
    </>
  )
}
DetailPart.propTypes = {
  activeFixedTag: PropTypes.object.isRequired
}

export default DetailPart
