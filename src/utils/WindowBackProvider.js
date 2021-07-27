import React from 'react'
import { useTagValue } from './contexts/TagContext'
import { useMissionValue } from './contexts/MissionContext'

export default function WindowBackProvider() {
  const { activeTag, resetActiveTag } = useTagValue()
  const { isInMission, handleCloseMission } = useMissionValue()
  React.useEffect(() => {
    window.history.pushState(null, null, window.location.pathname)
    const handleBackButton = (e) => {
      e.preventDefault()
      window.history.pushState(null, null, window.location.pathname)
    }
    window.addEventListener('popstate', (e) => handleBackButton(e), false)
    return window.removeEventListener('popstate', (e) => handleBackButton(e))
  }, [])
  React.useEffect(() => {
    window.addEventListener(
      'popstate',
      () => {
        console.log('back')
        if (activeTag) {
          resetActiveTag()
        }
        if (isInMission) {
          console.log('hi')
          handleCloseMission()
        }
      },
      false
    )
    return window.removeEventListener(
      'popstate',
      () => {
        console.log('back')
        if (activeTag) {
          resetActiveTag()
        }
        if (isInMission) {
          console.log('hi')
          handleCloseMission()
        }
      },
      false
    )
  }, [activeTag, resetActiveTag, isInMission, handleCloseMission])

  return null
}
