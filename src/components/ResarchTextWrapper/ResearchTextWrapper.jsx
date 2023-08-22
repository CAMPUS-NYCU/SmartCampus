import React from 'react'
import { Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  ResearchDetailWrapper: {
    variant: 'outlined',
    background: '#D9D9D9',
    textAlign: 'center',
    minWidth: '70%',
    width: 'auto',
    height: '100%',
    paddingLeft: 1,
    paddingRight: 1,
    boxShadow: 'none'
  }
}))

const ResearchTextWrapper = (props) => {
  const { bgcolor = '#D9D9D9', isEditable = false, children } = props
  const classes = useStyles()

  if (isEditable) {
    return (
      <>
        <Paper
          className={classes.ResearchDetailWrapper}
          style={{ background: '#FDCC4F' }}
        >
          {children}
        </Paper>
      </>
    )
  }

  return (
    <>
      <Paper
        className={classes.ResearchDetailWrapper}
        style={{ background: bgcolor }}
      >
        {children}
      </Paper>
    </>
  )
}

export default ResearchTextWrapper
