import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import TagDetailDialog from '../TagDetail/TagDetailDialog'
import elevator from '../../../../assets/images/elevator.png'
import ReactRough, { Circle, LinearPath, Line } from 'react-rough'

const useStyles = makeStyles({
  container: {
    backgroundColor: 'rgba(0.5,0.5,0.5, 0.5)',
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100
  },
  statusIcon: {
    height: '80px',
    width: '160px',
    position: 'absolute',
    right: '5px',
    bottom: '80vh'
  },
  changeIcon: {
    height: '22vh',
    width: '120px',
    position: 'absolute',
    left: '5px'
  }
})

const demoTag = {
  locationName: '浩然圖書館',
  category: {
    missionName: '設施任務',
    subTypeName: '無障礙設施',
    targetName: '無障礙電梯'
  },
  status: {
    statusName: '存在'
  },
  statusHistory: [],
  description:
    '水淹到腳踝，雖然嚴重但仍可通行。水淹到腳踝，雖然嚴重但仍可通行。水淹到腳踝，雖然嚴重但仍可通行。'
}

const demoDetail = {
  createTime: '2020-02-10 14:50',
  lastUpdateTime: '2020-02-10 14:50',
  description:
    '水淹到腳踝，雖然嚴重但仍可通行。水淹到腳踝，雖然嚴重但仍可通行。水淹到腳踝，雖然嚴重但仍可通行。',
  imageUrl: [elevator, elevator],
  status: {
    numberOfUpVote: 0,
    hasUpVote: false
  },
  createUser: {
    displayName: 'ilovenctu'
  },
  newLastUpdateTime: '2020-02-10 10:00'
}

export default function GuidePageStep3() {
  const classes = useStyles()
  const [changeStatusButton, setChangeStatusButton] = useState(null)
  useEffect(() => {
    let t = document.getElementById('changeStatusButton')
    setChangeStatusButton(t)
  }, [])
  console.log(changeStatusButton ? changeStatusButton.offsetTop : 0)
  return (
    <>
      <TagDetailDialog
        activeTag={demoTag}
        tagDetail={demoDetail}
        onClose={() => {}}
        deny={() => {}}
        guest={true}
      />
      <div className={classes.container}>
        <Typography
          variant='h6'
          style={{ position: 'absolute', left: 30, top: 30, color: 'white' }}
        >
          功能說明
        </Typography>
        <div className={classes.statusIcon}>
          <Typography
            variant='body2'
            style={{
              position: 'absolute',
              top: 47,
              left: '60px',
              color: 'white',
              zIndex: 102
            }}
          >
            地標目前的狀態
          </Typography>
          <div style={{ position: 'absolute', right: 0, bottom: '-70px' }}>
            <ReactRough width={80} height={100}>
              <Circle
                style={{ zIndex: 102 }}
                x={40}
                y={75}
                diameter={40}
                stroke='white'
              />
              <Line
                stroke='white'
                x1={40}
                x2={38}
                y1={50}
                y2={20}
                style={{ zIndex: 102 }}
              />
              <LinearPath
                style={{ zIndex: 102 }}
                points={[
                  [30, 37],
                  [40, 52],
                  [50, 37]
                ]}
                stroke='white'
              />
            </ReactRough>
          </div>
        </div>
        <div
          className={classes.changeIcon}
          style={{ top: changeStatusButton ? changeStatusButton.offsetTop : 0 }}
        >
          <Typography
            variant='body2'
            style={{
              position: 'absolute',
              top: '25%',
              left: '15px',
              color: 'white',
              zIndex: 102
            }}
          >
            更新地標狀態
          </Typography>
          <div style={{ position: 'absolute', bottom: 0, left: '15px' }}>
            <ReactRough width={80} height={100}>
              <Circle
                style={{ zIndex: 102 }}
                x={40}
                y={75}
                diameter={40}
                stroke='white'
              />
              <Line
                stroke='white'
                x1={40}
                x2={38}
                y1={50}
                y2={20}
                style={{ zIndex: 102 }}
              />
              <LinearPath
                style={{ zIndex: 102 }}
                points={[
                  [30, 37],
                  [40, 52],
                  [50, 37]
                ]}
                stroke='white'
              />
            </ReactRough>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: changeStatusButton ? changeStatusButton.offsetTop : 0,
            right: '15px',
            height: '22vh',
            width: '120px'
          }}
        >
          <Typography
            variant='body2'
            style={{
              position: 'absolute',
              top: '25%',
              right: '5px',
              color: 'white',
              zIndex: 102
            }}
          >
            查看歷史狀態
          </Typography>
          <div style={{ position: 'absolute', bottom: 0, right: '0px' }}>
            <ReactRough width={80} height={100}>
              <Circle
                style={{ zIndex: 102 }}
                x={40}
                y={75}
                diameter={40}
                stroke='white'
              />
              <Line
                stroke='white'
                x1={40}
                x2={38}
                y1={50}
                y2={20}
                style={{ zIndex: 102 }}
              />
              <LinearPath
                style={{ zIndex: 102 }}
                points={[
                  [30, 37],
                  [40, 52],
                  [50, 37]
                ]}
                stroke='white'
              />
            </ReactRough>
          </div>
        </div>
      </div>
    </>
  )
}
