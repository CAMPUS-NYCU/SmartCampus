import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import ReactRough, { Circle, LinearPath, Curve, Line } from 'react-rough'

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: 'rgba(0.5,0.5,0.5, 0.5)',
    width: '100vw',
    height: 'calc(var(--vh, 1vh)*100)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1
  },
  missionFab: {
    zIndex: '0',
    position: 'absolute',
    bottom: 0,
    width: '100vw',
    display: 'flex',
    justifyContent: 'center'
  },
  mapFab: {
    position: 'absolute',
    top: 'calc(var(--vh, 1vh)*30)',
    left: '10vw',
    height: 'calc(var(--vh, 1vh)*40)',
    width: '80vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  locationFab: {
    position: 'absolute',
    top: 130,
    right: 0,
    height: '120px',
    width: '100px'
  },
  hamburgerFab: {
    position: 'absolute',
    top: 0,
    right: '5px',
    height: '140px',
    width: '210px'
  }
}))

export default function GuidePageStep1() {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Typography
        variant='h6'
        style={{ position: 'absolute', left: 30, top: 30, color: 'white' }}
      >
        功能說明
      </Typography>
      <div className={classes.missionFab}>
        <Typography
          variant='body1'
          style={{
            position: 'absolute',
            top: '75px',
            left: '23px',
            color: 'white'
          }}
        >
          添加回報
        </Typography>
        <ReactRough>
          <Circle
            style={{ zIndex: 2 }}
            x={150}
            y={90}
            diameter={75}
            stroke='white'
          />
          <Curve
            style={{ zIndex: 2 }}
            points={[
              [40, 70],
              [65, 60],
              [100, 70]
            ]}
            stroke='white'
          />
          <LinearPath
            style={{ zIndex: 2 }}
            points={[
              [90, 55],
              [105, 73],
              [86, 84]
            ]}
            stroke='white'
          />
        </ReactRough>
      </div>
      <div className={classes.mapFab}>
        <Typography variant='h5' style={{ color: 'white' }}>
          自由查看校園地圖
        </Typography>
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
          <ReactRough width={50} height={40}>
            <Line
              x1={10}
              x2={50}
              y1={10}
              y2={40}
              style={{ zIndex: 2 }}
              stroke='white'
            />
            <LinearPath
              style={{ zIndex: 2 }}
              points={[
                [12, 25],
                [5, 7],
                [20, 2]
              ]}
              stroke='white'
            />
          </ReactRough>
        </div>
        <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <ReactRough width={50} height={40}>
            <Line
              stroke='white'
              x1={0}
              x2={40}
              y1={0}
              y2={30}
              style={{ zIndex: 2 }}
            />
            <LinearPath
              style={{ zIndex: 2 }}
              points={[
                [38, 15],
                [45, 37],
                [30, 38]
              ]}
              stroke='white'
            />
          </ReactRough>
        </div>
      </div>
      <div className={classes.locationFab}>
        <Typography
          variant='body2'
          style={{
            position: 'absolute',
            bottom: 0,
            left: '10px',
            color: 'white'
          }}
        >
          定位你的位置
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ReactRough width={80} height={90}>
            <Circle
              stroke='white'
              style={{ zIndex: 200000 }}
              x={40}
              y={40}
              diameter={50}
            />
            <Line
              stroke='white'
              x1={40}
              x2={37}
              y1={70}
              y2={85}
              style={{ zIndex: 2 }}
            />
            <LinearPath
              style={{ zIndex: 2 }}
              points={[
                [30, 75],
                [40, 70],
                [50, 75]
              ]}
              stroke='white'
            />
          </ReactRough>
        </div>
      </div>
      <div className={classes.hamburgerFab}>
        <Typography
          variant='body2'
          style={{
            position: 'absolute',
            left: 0,
            top: '20px',
            color: 'white'
          }}
        >
          查看更多功能
        </Typography>
        <Typography
          variant='body2'
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            color: 'white'
          }}
        >
          選擇你想看的地標
        </Typography>
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          <ReactRough height={140} width={120}>
            <Circle
              style={{ zIndex: 2 }}
              x={80}
              y={55}
              diameter={46}
              stroke='white'
            />

            <Curve
              style={{ zIndex: 2 }}
              points={[
                [5, 25],
                [20, 15],
                [50, 25]
              ]}
              stroke='white'
            />

            <LinearPath
              style={{ zIndex: 2 }}
              points={[
                [40, 10],
                [51, 26],
                [43, 38]
              ]}
              stroke='white'
            />
            <Circle
              style={{ zIndex: 2 }}
              x={35}
              y={55}
              diameter={46}
              stroke='white'
            />
            <Curve
              style={{ zIndex: 2 }}
              points={[
                [35, 80],
                [25, 110],
                [15, 120]
              ]}
              stroke='white'
            />
            <LinearPath
              style={{ zIndex: 2 }}
              points={[
                [15, 100],
                [35, 80],
                [50, 100]
              ]}
              stroke='white'
            />
          </ReactRough>
        </div>
      </div>
    </div>
  )
}
