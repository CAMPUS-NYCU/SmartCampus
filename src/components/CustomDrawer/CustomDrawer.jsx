import React from 'react'
import { Drawer, Toolbar, IconButton, Typography, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import CustomButton from '../CustomButton'

const useStyles = makeStyles((theme) => ({
  drawerPaperStyle: {
    borderRadius: '20px 20px 0 0',
    backgroundColor: '#FAFAFA',
    overflow: 'scroll',
    zIndex: '20',
    [theme.breakpoints.up('sm')]: {
      width: '400px'
    }
  },
  drawerContentFull: {
    minHeight: 450,
    height: 'calc(100vh - 100px)'
  },
  drawerContentPart: {
    // minHeight: 300,
    height: 'calc(50vh)'
  },
  titleBar: {
    position: 'sticky',
    top: 0,
    width: '100%',
    height: 40,
    minHeight: 40,
    backgroundColor: '#FAFAFA',
    zIndex: 100
  },
  missionContent: {
    backgroundColor: '#FAFAFA',
    paddingBottom: 64
  },
  closeButton: {
    padding: 0
  },
  titleActionContainer: {
    position: 'absolute',
    right: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
}))

const CustomDrawer = (props) => {
  const {
    children,
    open,
    handleClose,
    handleBack,
    height,
    closeButton,
    title,
    titleActions,
    variant
  } = props
  const classes = useStyles()

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const getDrawerContentStyle = () => {
    switch (height) {
      case 'full':
        return classes.drawerContentFull
      case 'part':
        return classes.drawerContentPart
      default:
        return null
    }
  }

  return (
    <Drawer
      anchor={matches ? 'left' : 'bottom'}
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.drawerPaperStyle }}
      variant={variant}
    >
      <Box
        display='flex'
        flexDirection='column'
        className={getDrawerContentStyle()}
      >
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
          <Typography
            variant='h6'
            style={{
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            {title}
          </Typography>
          <Box className={classes.titleActionContainer}>
            {titleActions.map((titleAction) => (
              <Box key={titleAction.name} p={2}>
                <CustomButton
                  buttonType='roundButton_activated'
                  size='small'
                  onClick={titleAction.handleOnClick}
                  disabled={titleAction.disable}
                >
                  {titleAction.name}
                </CustomButton>
              </Box>
            ))}
          </Box>
        </Toolbar>
        {children}
      </Box>
    </Drawer>
  )
}

CustomDrawer.defaultProps = {
  handleBack: null,
  height: null,
  closeButton: true,
  variant: 'temporary',
  titleActions: []
}

CustomDrawer.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleBack: PropTypes.func,
  height: PropTypes.string,
  closeButton: PropTypes.bool,
  title: PropTypes.string.isRequired,
  titleActions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      handleOnClick: PropTypes.func,
      disable: PropTypes.bool
    })
  ),
  variant: PropTypes.string
}

export default CustomDrawer
