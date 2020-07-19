import React from 'react'

/**
 * 設計用來放在App.js的component，會對全域注入`--vh` css variable
 * 因為正常`vh`單位，在手機版上會不準，所以使用此variable是用來取代內建`vh`
 * 使用上是這樣用：`var(--vh, 1vh)`
 * 此`--vh`也會根據resize event動態調整，不會不準
 *
 * 寫法參考自：
 * https://usehooks.com/useWindowSize/
 * https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 *
 * @return {null}
 * @constructor
 */
function WindowHeightProvider() {
  React.useEffect(() => {
    const isClient = typeof window === 'object'
    if (!isClient) {
      return false
    }

    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    function handleResize() {
      const vhNew = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vhNew}px`)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return null
}

export default WindowHeightProvider
