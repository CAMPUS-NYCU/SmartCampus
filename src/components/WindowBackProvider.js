import React from 'react'

export default function WindowBackProvider() {
  const handleBackButton = (e) => {
    e.preventDefault()
    window.history.pushState(null, null, window.location.pathname)
  }

  React.useEffect(() => {
    window.history.pushState(null, null, window.location.pathname)
    window.addEventListener('popstate', (e) => handleBackButton(e), false)
    return window.removeEventListener('popstate', (e) => handleBackButton(e))
  }, [])
  return null
}
