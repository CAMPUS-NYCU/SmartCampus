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
import RateReviewIcon from '@material-ui/icons/RateReview'
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
    {
      id: 3,
      text: '功能介紹',
      action: handleOpenHowToUse,
      icon: <HelpIcon color='primary' />
    },
    {
      id: 4,
      text: '意見回饋',
      action: () => window.open('https://forms.gle/M9zsKyJyAvLLx3o2A'),
      icon: <RateReviewIcon color='primary' />
    },
    {
      id: 5,
      text: '登出',
      action: signOut,
      icon: <ExitToAppIcon color='primary' />
    }
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
    anchorEl: PropTypes.object,
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
