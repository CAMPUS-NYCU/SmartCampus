import { useState } from 'react';

const useMenu = (initialAnchorEl = null) => {
  const [anchorEl, setAnchorEl] = useState(initialAnchorEl);
  const setOpen = (event) => setAnchorEl(event.currentTarget);
  const setClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  return {
    open, anchorEl, setOpen, setClose,
  };
};

export default useMenu;
