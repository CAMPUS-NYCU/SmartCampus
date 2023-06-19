import React from 'react'
import { Button } from '@mui/material'
// import { withStyles } from '@mui/material/styles'
import { withStyles } from '@mui/styles'

let className
export default withStyles((theme) => ({
  roundButton_activated: {
    borderRadius: '20px',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  roundButton_inactivated: {
    borderRadius: '20px',
    color: theme.palette.greyOut.contrastText,
    backgroundColor: theme.palette.greyOut.main,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',
    '&:hover': {
      backgroundColor: theme.palette.greyOut.main,
      color: theme.palette.greyOut.contrastText
    }
  },
  boxButton_activated: {
    borderRadius: '5px',
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  boxButton_inactivated: {
    borderRadius: '5px',
    color: theme.palette.greyOut.contrastText,
    backgroundColor: theme.palette.greyOut.main,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',
    '&:hover': {
      backgroundColor: theme.palette.greyOut.main,
      color: theme.palette.greyOut.contrastText
    }
  },
  textButton_activated: {
    color: theme.palette.primary.main,
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  textButton_inactivated: {
    color: theme.palette.greyOut.contrastText,
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
    '&:hover': {
      color: theme.palette.greyOut.contrastText
    }
  },
  finishButton: {
    backgroundColor: '#EEEEEE',
    boxSizing: 'border-box',
    borderRadius: '20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',
    '&:hover': {
      backgroundColor: '#EEEEEE'
    }
  },
  defaultButton: {
    color: theme.palette.greyOut.contrastText,
    '&:hover': {
      color: theme.palette.greyOut.contrastText
    }
  },
  fixedTagfloorButton: {
    borderBottom: '5px solid #lightgray',
    '&:hover': {
      color: theme.palette.primary.main,
      borderBottom: '5px solid ',
      borderBottomColor: theme.palette.primary.main
    }
  },
  fixedTagChosefloorButton: {
    color: theme.palette.primary.main,
    borderBottom: '5px solid ',
    borderBottomColor: theme.palette.primary.main
  },
  fixedTagDetailButton: {
    borderRadius: '5px',
    margin: '8px',
    color: theme.palette.greyOut.contrastText,
    backgroundColor: theme.palette.greyOut.main,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
  }
}))((props) => {
  const {
    buttonType,
    classes,
    position,
    right,
    noShadow,
    variant,
    color,
    backgroundColor,
    size,
    children,
    borderRadius,
    ...rest
  } = props

  switch (buttonType) {
    case 'roundButton_activated':
      className = classes.roundButton_activated
      break
    case 'roundButton_inactivated':
      className = classes.roundButton_inactivated
      break
    case 'boxButton_activated':
      className = classes.boxButton_activated
      break
    case 'boxButton_inactivated':
      className = classes.boxButton_inactivated
      break
    case 'textButton_activated':
      className = classes.textButton_activated
      break
    case 'textButton_inactivated':
      className = classes.textButton_inactivated
      break
    case 'finishButton':
      className = classes.finishButton
      break
    case 'fixedTagfloorButton':
      className = classes.fixedTagfloorButton
      break
    case 'fixedTagChosefloorButton':
      className = classes.fixedTagChosefloorButton
      break
    case 'fixedTagDetailButton':
      className = classes.fixedTagDetailButton
      break
    default:
      className = classes.defaultButton
      break
  }

  return (
    <Button className={className} variant={variant} size={size} {...rest}>
      {children}
    </Button>
  )
})
