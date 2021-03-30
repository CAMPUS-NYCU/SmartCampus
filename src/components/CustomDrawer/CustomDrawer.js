import React from 'react'
import {
  Drawer,
  makeStyles,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import CloseIcon from '@material-ui/icons/Close'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  drawerPaperStyle: {
    borderRadius: '20px 20px 0 0',
    backgroundColor: '#FAFAFA',
    zIndex: '20',
    [theme.breakpoints.up('sm')]: {
      width: '400px'
    }
  },
  drawerContentFull: {
    minHeight: 450,
    height: 'calc(var(--vh, 1vh) * 100 - 100px)'
  },
  titleBar: {
    position: 'sticky',
    top: 0,
    width: '100%',
    height: 40,
    backgroundColor: '#FAFAFA',
    zIndex: 100
  },
  missionContent: {
    backgroundColor: '#FAFAFA',
    paddingBottom: 64
  },
  closeButton: {
    padding: 0
  }
}))

const CustomDrawer = (props) => {
  const {
    children,
    open,
    handleClose,
    handleBack,
    fullHeight,
    closeButton,
    title,
    variant,
    width
  } = props
  const classes = useStyles()
  return (
    <Drawer
      anchor={isWidthUp('sm', width) ? 'left' : 'bottom'}
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.drawerPaperStyle }}
      variant={variant}
    >
      <div className={fullHeight ? classes.drawerContentFull : null}>
        <Toolbar className={classes.titleBar}>
          {closeButton ? (
            <IconButton
              style={{ position: 'absolute', right: '10px' }}
              edge='start'
              aria-label='close'
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton
              edge='start'
              aria-label='close'
              onClick={handleBack || handleClose}
            >
              <KeyboardReturnIcon />
            </IconButton>
          )}
          <Typography variant='h6'>{title}</Typography>
        </Toolbar>
        {children}
      </div>
    </Drawer>
  )
}

CustomDrawer.defaultProps = {
  handleBack: () => {},
  fullHeight: false,
  closeButton: true,
  variant: 'persistent'
}

CustomDrawer.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleBack: PropTypes.func,
  fullHeight: PropTypes.bool,
  closeButton: PropTypes.bool,
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  width: PropTypes.string.isRequired
}

export default withWidth()(CustomDrawer)
