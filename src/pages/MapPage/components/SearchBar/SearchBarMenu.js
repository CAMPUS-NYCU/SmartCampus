import React from 'react';
import PropTypes from 'prop-types';

import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
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
  list: {
    minWidth: 160,
  },
  listIcon: {
    minWidth: 0,
    marginRight: theme.spacing(2),
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
        <ListItem
          button
          dense
          divider
          onClick={() => {
            handleOpenProfile();
            setClose();
          }}
        >
          <ListItemIcon className={classes.listIcon}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="個人資料" />
        </ListItem>

        <ListItem
          button
          dense
          divider
          onClick={() => {
            handleOpenHistory();
            setClose();
          }}
        >
          <ListItemIcon className={classes.listIcon}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="歷史回報" />
        </ListItem>

        <ListItem
          button
          dense
          divider
          onClick={() => {
            handleOpenSetting();
            setClose();
          }}
        >
          <ListItemIcon className={classes.listIcon}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="通知設定" />
        </ListItem>

        <ListItem
          button
          dense
          divider
          onClick={() => {
            handleOpenHowToUse();
            setClose();
          }}
        >
          <ListItemIcon className={classes.listIcon}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="功能介紹" />
        </ListItem>

        <ListItem
          button
          dense
          divider
          onClick={() => {
            handleOpenTerms();
            setClose();
          }}
        >
          <ListItemIcon className={classes.listIcon}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="條款事項" />
        </ListItem>
      </List>
    </Popover>
  );
}

export default SearchBarMenu;
