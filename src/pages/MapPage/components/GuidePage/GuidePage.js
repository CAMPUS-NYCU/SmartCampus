import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import ReactRough, { Circle, LinearPath, Curve } from 'react-rough'

const useStyles = makeStyles((theme) => ({
  container: {
    background: 'gray',
    opacity: 0.6,
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100000
  },
  missionFab: {
    zIndex: '0',
    position: 'absolute',
    bottom: 0,
    width: '100vw',
    display: 'flex',
    justifyContent: 'center'
  }
}))

const GuidePage = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.missionFab}>
        <ReactRough>
          <Circle
            style={{ zIndex: '200000' }}
            x={150}
            y={90}
            diameter={75}
            stroke='white'
          />
          <Curve
            style={{ zIndex: '200000' }}
            points={[
              [40, 70],
              [65, 60],
              [100, 70]
            ]}
            stroke='white'
          />
          <LinearPath
            style={{ zIndex: '200000' }}
            points={[
              [90, 55],
              [105, 73],
              [86, 84]
            ]}
            stroke='white'
          />
        </ReactRough>
      </div>
    </div>
  )
}

export default GuidePage
