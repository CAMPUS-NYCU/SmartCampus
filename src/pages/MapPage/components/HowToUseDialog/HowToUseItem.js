import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

HowToUseItem.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string
}
HowToUseItem.defaultProps = {
  description: ''
}

function HowToUseItem({ icon, title, description }) {
  return (
    <>
      <Grid item xs={2}>
        {icon}
      </Grid>
      <Grid item xs={10}>
        <Typography variant='h6'>{title}</Typography>
        {description && <Typography>{description}</Typography>}
      </Grid>
    </>
  )
}

export default HowToUseItem
