import { useState } from 'react';

const useModal = (initialOpen = false) => {
  const [open, changeOpen] = useState(initialOpen);
  const toggle = () => changeOpen(!open);
  const setOpen = () => changeOpen(true);
  const setClose = () => changeOpen(false);
  return {
    open, setOpen, setClose, changeOpen, toggle,
  };
};

export default useModal;
