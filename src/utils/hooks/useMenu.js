import { useState, useCallback, useMemo } from 'react'

const useMenu = (initialAnchorEl = null) => {
  const [anchorEl, setAnchorEl] = useState(initialAnchorEl)
  const setOpen = useCallback((event) => setAnchorEl(event.currentTarget), [])
  const setClose = useCallback(() => setAnchorEl(null), [])
  const open = useMemo(() => Boolean(anchorEl), [anchorEl])
  return {
    open,
    anchorEl,
    setOpen,
    setClose
  }
}

export default useMenu
