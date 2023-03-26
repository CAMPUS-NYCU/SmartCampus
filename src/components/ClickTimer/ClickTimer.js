import React from 'react'
import { getItem, setItem } from '../../utils/functions/localStorage'
import clickTimerType from './clickTimerType'

const ClickTimer = ({ data, type, children }) => {
  const create = () => {
    const nowTime = new Date().getTime()
    const ClickStatus = {
      timestamp: nowTime
    }
    setItem('ClickStatus', ClickStatus)
  }

  const extend = () => {
    const ClickStatus = getItem('ClickStatus') || {}
    ClickStatus[data.key] = data.value
    setItem('ClickStatus', ClickStatus)
  }

  const reset = () => {
    setItem('ClickStatus', {})
  }

  const recordFinish = () => {
    const ClickStatus = getItem('ClickStatus') || {}
    const timestamp = ClickStatus.timestamp || 0
    delete ClickStatus.timestamp
    const nowTime = new Date().getTime()
    ClickStatus.timePassed = nowTime - timestamp
    console.log(ClickStatus)
  }

  const clickTimerAction = () => {
    switch (type) {
      case clickTimerType.Create:
        create()
        break
      case clickTimerType.Extend:
        extend()
        break
      case clickTimerType.Record:
        recordFinish()
        reset()
        break
      default:
        break
    }
  }
  const handleClick = (onClick) => {
    if (onClick) {
      onClick()
      clickTimerAction()
    }
  }

  const newChildren = React.cloneElement(children, {
    onClick: () => handleClick(children.props.onClick)
  })

  return newChildren
}

export default ClickTimer
