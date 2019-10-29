import React from 'react';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FlagIcon from '@material-ui/icons/Flag';
import LayersIcon from '@material-ui/icons/Layers';
import HistoryIcon from '@material-ui/icons/History';

function NavBottom(props) {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="Mission" icon={<FlagIcon />} />
      <BottomNavigationAction label="Category" icon={<LayersIcon />} />
      <BottomNavigationAction label="History" icon={<HistoryIcon />} />
    </BottomNavigation>
  );
}

export default NavBottom;
