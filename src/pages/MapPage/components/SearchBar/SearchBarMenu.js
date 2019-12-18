import React from 'react';
import PropTypes from 'prop-types';

import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from '@material-ui/core/styles';

SearchBarMenu.propTypes = {
  control: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.element,
    setClose: PropTypes.func.isRequired,
  }).isRequired,
  menuControls: PropTypes.shape({
    handleOpenProfile: PropTypes.func.isRequired,
    handleOpenHistory: PropTypes.func.isRequired,
    handleOpenSetting: PropTypes.func.isRequired,
    handleOpenHowToUse: PropTypes.func.isRequired,
    handleOpenTerms: PropTypes.func.isRequired,
  }).isRequired,
};

const useStyles = makeStyles((theme) => ({
  listIcon: {
    minWidth: 0,
    marginRight: theme.spacing(1),
  },
}));

function SearchBarMenu(props) {
  const {
    control: {
      open,
      anchorEl,
      setClose,
    },
    menuControls: {
      handleOpenProfile,
      handleOpenHistory,
      handleOpenSetting,
      handleOpenHowToUse,
      handleOpenTerms,
    },
  } = props;
  const classes = useStyles();

  const menuItems = [
    {
      id: 1,
      text: '個人資料',
      action: handleOpenProfile,
      icon: <PersonIcon />,
    },
    {
      id: 2,
      text: '歷史回報',
      action: handleOpenHistory,
      icon: <HistoryIcon />,
    },
    {
      id: 3,
      text: '通知設定',
      action: handleOpenSetting,
      icon: <SettingsIcon />,
    },
    {
      id: 4,
      text: '功能介紹',
      action: handleOpenHowToUse,
      icon: <HelpIcon />,
    },
    {
      id: 5,
      text: '條款事項',
      action: handleOpenTerms,
      icon: <AssignmentIcon />,
    },
  ];

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={setClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <List className={classes.list} dense disablePadding>
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            button
            dense
            divider
            onClick={() => {
              item.action();
              setClose();
            }}
          >
            <ListItemIcon className={classes.listIcon}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Popover>
  );
}

export default SearchBarMenu;
