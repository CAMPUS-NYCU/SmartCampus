import React from 'react'
import { useTagValue } from '../pages/MapPage/contexts/TagContext'

export default function WindowBackProvider(props) {
  const { activeTag, resetActiveTag } = useTagValue()
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
        },
        false
      )
  },[activeTag, resetActiveTag])

  return null
}
