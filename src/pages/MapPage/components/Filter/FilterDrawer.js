import React from 'react'
import {
  Drawer,
  makeStyles,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Button,
  Box
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { facilitySubType } from '../../constants/missionInfo'
import { useTagValue } from '../../contexts/TagContext'

const useStyles = makeStyles({
  drawerContent: {
    height: '40vh',
    overflow: 'scroll'
  },
  closeButton: {
    position: 'absolute',
    right: '15px'
  },
  content: {
    overflowY: 'scroll'
  }
})

const FilterDrawer = (props) => {
  const { open, onClose } = props
  const classes = useStyles()
  const { filterTags, addFilterTags } = useTagValue()
  const { target = [] } =
    facilitySubType.find((facility) => facility.subTypeName === '無障礙設施') ||
    {}
  return (
    <Drawer
      anchor='bottom'
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: '20px 20px 0 0',
          backgroundColor: '#FAFAFA'
        }
      }}
    >
      <div className={classes.drawerContent}>
        <Toolbar
          style={{ position: 'sticky', top: '0', backgroundColor: '#FAFAFA' }}
        >
          <Typography variant='h5'>篩選</Typography>
          <IconButton
            className={classes.closeButton}
            edge='end'
            onClick={onClose}
          >
            <CloseIcon fontSize='medium' />
          </IconButton>
        </Toolbar>
        <Box p={2} display='flex'>
          <Grid container spacing={2}>
            <Grid container item xs={12} direction='row'>
              <Typography variant='h6'>標註類型</Typography>
            </Grid>
            {facilitySubType.map((facility) => (
              <Grid key={facility.subTypeName} item xs={4}>
                <Button
                  variant='contained'
                  fullWidth
                  size='small'
                  color={
                    filterTags.indexOf(facility.subTypeName) === -1
                      ? ''
                      : 'primary'
                  }
                  onClick={() => addFilterTags(facility.subTypeName)}
                >
                  {facility.subTypeName}
                </Button>
              </Grid>
            ))}
            <Grid container item xs={12} direction='row'>
              <Typography variant='h6'>具體設施</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {target.map((discovery) => (
                  <Grid id={discovery.targetName} item xs={4}>
                    <Button
                      variant='contained'
                      fullWidth
                      size='small'
                      color={
                        filterTags.indexOf(discovery.targetName) === -1
                          ? ''
                          : 'primary'
                      }
                      onClick={() => addFilterTags(discovery.targetName)}
                    >
                      {discovery.targetName}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid container item xs={12} direction='row'>
              <Typography variant='h6'>具體設施</Typography>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Drawer>
  )
}

export default FilterDrawer
