import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TagDetailDialog from '../TagDetail/TagDetailDialog'
import elevator from '../../../../assets/images/elevator.png'

const useStyles = makeStyles({
  container: {
    backgroundColor: 'rgba(0.5,0.5,0.5, 0.5)',
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100
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
  status:{
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

  return (
    <>
      <TagDetailDialog
        activeTag={demoTag}
        tagDetail={demoDetail}
        onClose={() => {}}
        deny={() => {}}
        guest={true}
      />
      <div className={classes.container}></div>
    </>
  )
}
