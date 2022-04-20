import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import noImage from '../../../../assets/images/no-image.svg'
import informationImage from '../../../../assets/images/fixedTagInformation.svg'
import changeImage from '../../../../assets/images/fixedTagChange.svg'
import CustomButton from '../../../../components/CustomButton'
import { fixedTagContext } from '../../../../constants/fixedTagContext'

const DetailPart = (props) => {
  const { fixedtagDetail, activeFixedTag } = props
  const [floor, setFloor] = useState('1F')
  const { information = [] } = useMemo(
    () =>
      fixedTagContext.find(
        (fixedtagfloor) =>
          fixedtagfloor.locationName === activeFixedTag.locationName
      ) || {},
    [activeFixedTag]
  )
  return (
    <>
      <div
        style={{
          width: '100%',
          margin: '4vw 0 0 0',
          height: '100%',
          flexGrow: '1',
          overflowX: 'scroll',
          overflowY: 'hidden',
          display: '-webkit-flex',
          flexDirection: 'row'
        }}
      >
        <div
          style={{
            width: '100%',
            flexShrink: '0',
            overflow: 'hidden',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${noImage})`
          }}
        />
      </div>
      <Box
        display='flex'
        alignItems='center'
        flexDirection='row'
        style={{
          overflowY: 'hidden',
          overflowX: 'scroll',
          height: '13%',
          width: '90%'
        }}
        m={2}
      >
        {information.map((discovery) => (
          <Grid item xs={4}>
            <CustomButton
              buttonType={
                discovery.floor === floor
                  ? 'fixedTagChosefloorButton'
                  : 'fixedTagfloorButton'
              }
              onClick={() => setFloor(discovery.floor)}
            >
              {discovery.floor}
            </CustomButton>
          </Grid>
        ))}
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        style={{
          overflowX: 'hidden',
          overflowY: 'scroll',
          height: '80%',
          width: '90%'
        }}
        m={2}
      >
        {activeFixedTag.fixedTagSubLocations.map((fixedtagfloor) => {
          while (
            fixedtagfloor.floor === floor &&
            fixedtagfloor.type !== 'floor'
          ) {
            return (
              <Grid
                container
                spacing={2}
                style={{
                  backgroundColor: '#EEEEEE',
                  borderRadius: '5px',
                  margin: '5px'
                }}
                justify='center'
                alignItems='center'
              >
                <Grid
                  item
                  xs={6}
                  style={{
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  {fixedtagfloor.name}
                </Grid>
                <Grid item xs={5}>
                  <Button
                    id='changeStatusButton'
                    style={{
                      background: '#FDCC4F',
                      fontSize: '12px',
                      /* Primary_light */
                      borderRadius: '20px',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
                    }}
                    variant='contained'
                  >
                    {fixedtagfloor.status.statusName}
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  Users
                </Grid>
                <Grid item style={{ justifyContent: 'flex-end', xs: '4' }}>
                  <Button
                    id='changeStatusButton'
                    size='small'
                    style={{
                      background: '#FDCC4F',
                      fontSize: '12px',
                      /* Primary_light */
                      borderRadius: '20px',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
                    }}
                    variant='contained'
                  >
                    <img src={informationImage} alt='' />
                    &nbsp;詳細資訊
                  </Button>
                </Grid>
                <Grid item style={{ justifyContent: 'flex-end', xs: '4' }}>
                  <Button
                    id='changeStatusButton'
                    size='small'
                    style={{
                      background: '#FDCC4F',
                      fontSize: '12px',
                      /* Primary_light */
                      borderRadius: '20px',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
                    }}
                    variant='contained'
                  >
                    <img src={changeImage} alt='' />
                    &nbsp;更改狀態
                  </Button>
                </Grid>
              </Grid>
            )
          }
        })}
      </Box>
    </>
  )
}
DetailPart.propTypes = {
  activeFixedTag: PropTypes.object.isRequired,
  fixedtagDetail: PropTypes.object.isRequired
}

export default DetailPart
