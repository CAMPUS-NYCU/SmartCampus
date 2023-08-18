import React from 'react'
import { Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  ResearchDetailWrapper: {
    variant: 'outlined',
    background: '#D9D9D9',
    textAlign: 'center',
    width: '100%',
    boxShadow: 'none'
  }
}))

const ResearchTextWrapper = (props) => {
  const { bgcolor = '#D9D9D9', children } = props
  const classes = useStyles()

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
