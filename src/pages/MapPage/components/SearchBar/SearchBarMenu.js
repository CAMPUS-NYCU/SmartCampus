import React from 'react'
import PropTypes from 'prop-types'

import Popover from '@material-ui/core/Popover'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PersonIcon from '@material-ui/icons/Person'
import DescriptionIcon from '@material-ui/icons/Description'
import HelpIcon from '@material-ui/icons/Help'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  listIcon: {
    minWidth: 0,
    marginRight: theme.spacing(1)
  }
}))

function SearchBarMenu(props) {
  const {
    control: { open, anchorEl, setClose },
    menuControls: { handleOpenProfile, handleOpenHistory, handleOpenHowToUse },
    signOut
  } = props
  const classes = useStyles()

  const menuItems = [
    {
      id: 1,
      text: '個人資料',
      action: handleOpenProfile,
      icon: <PersonIcon color='primary' />
    },
    {
      id: 2,
      text: '回報紀錄',
      action: handleOpenHistory,
      icon: <DescriptionIcon color='primary' />
    },
    // {
    //   id: 3,
    //   text: '通知設定',
    //   action: handleOpenSetting,
    //   icon: <SettingsIcon />
    // },
    {
      id: 3,
      text: '功能介紹',
      action: handleOpenHowToUse,
      icon: <HelpIcon color='primary' />
    },
    {
      id: 4,
      text: '登出',
      action: signOut,
      icon: <ExitToAppIcon color='primary' />
    }
    // {
    //   id: 5,
    //   text: '條款事項',
    //   action: handleOpenTerms,
    //   icon: <AssignmentIcon />
    // }
  ]

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={setClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
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
              item.action()
              setClose()
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
  )
}

SearchBarMenu.propTypes = {
  control: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.element,
    setClose: PropTypes.func.isRequired
  }).isRequired,
  menuControls: PropTypes.shape({
    handleOpenProfile: PropTypes.func.isRequired,
    handleOpenHistory: PropTypes.func.isRequired,
    handleOpenSetting: PropTypes.func.isRequired,
    handleOpenHowToUse: PropTypes.func.isRequired,
    handleOpenTerms: PropTypes.func.isRequired
  }).isRequired
}

export default SearchBarMenu
