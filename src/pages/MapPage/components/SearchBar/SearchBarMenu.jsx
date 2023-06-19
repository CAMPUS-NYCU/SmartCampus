import React from 'react'
import PropTypes from 'prop-types'

import Popover from '@mui/material/Popover'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PersonIcon from '@mui/icons-material/Person'
import DescriptionIcon from '@mui/icons-material/Description'
import HelpIcon from '@mui/icons-material/Help'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import RateReviewIcon from '@mui/icons-material/RateReview'
// import { makeStyles } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

import { useUserValue } from '../../../../utils/contexts/UserContext'

const useStyles = makeStyles((theme) => ({
  listIcon: {
    minWidth: 0,
    marginRight: theme.spacing(1)
  }
}))

function SearchBarMenu(props) {
  const {
    control: { open, anchorEl, setClose },
    menuControls: { handleOpenUser, handleOpenHistory, handleOpenHowToUse }
  } = props
  const classes = useStyles()
  const { signOut } = useUserValue()

  const menuItems = [
    {
      id: 1,
      text: '個人資料',
      action: handleOpenUser,
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
    handleOpenUser: PropTypes.func.isRequired,
    handleOpenHistory: PropTypes.func.isRequired,
    handleOpenSetting: PropTypes.func.isRequired,
    handleOpenHowToUse: PropTypes.func.isRequired,
    handleOpenTerms: PropTypes.func.isRequired
  }).isRequired
}

export default SearchBarMenu
