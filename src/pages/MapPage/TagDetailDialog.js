import React from 'react'
import PropTypes from 'prop-types'

import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

TagDetailDialog.propTypes = {
  activeTag: PropTypes.object,
  onClose: PropTypes.func.isRequired
}
TagDetailDialog.defaultProps = {
  activeTag: null
}

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}))

function TagDetailDialog(props) {
  const { activeTag, onClose } = props
  const classes = useStyles()

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby='tag-detail-dialog'
      open={activeTag}
      fullWidth
    >
      <DialogTitle disableTypography onClose={onClose}>
        <Typography variant='h6'>
          {activeTag ? activeTag.title : '詳細資訊'}
        </Typography>
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {activeTag ? (
          <>
            <Typography>Accessibility：{activeTag.accessibility}</Typography>
            <Typography>任務：{activeTag.missionName}</Typography>
            <Typography>發現：{activeTag.discoveryName}</Typography>
          </>
        ) : (
          <Typography>讀取中...</Typography>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default TagDetailDialog
