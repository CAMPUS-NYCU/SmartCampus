import React, { useEffect } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Grid,
  Box,
  makeStyles,
  CircularProgress
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { useUserValue } from '../../../../utils/contexts/UserContext'
import CustomDrawer from '../../../../components/CustomDrawer'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import { useMissionValue } from '../../../../utils/contexts/MissionContext'
import { MAP_PATH } from '../../../../constants/pageUrls'
import Mission1 from '../../../../assets/images/mission1.svg'
import Mission2 from '../../../../assets/images/mission2.svg'
import Mission3 from '../../../../assets/images/mission3.svg'
import CustomButton from '../../../../components/CustomButton'

const useStyle = makeStyles(() => ({
  tag: {
    background: '#FDCC4F',
    border: '1.5px solid #FFEDC0',
    boxSizing: 'border-box',
    borderRadius: '5px'
  }
}))

const ReportHistory = (props) => {
  const {
    control: { open, setClose }
  } = props
  const history = useHistory()
  const { activeTag, userAddTags, getUserTagList } = useTagValue()
  const { uid } = useUserValue()

  const { isInMission } = useMissionValue()
  const missionImages = [Mission1, Mission2, Mission3]
  const classes = useStyle()
  useEffect(() => {
    if (uid) getUserTagList({ variables: { uid } })
  }, [uid, getUserTagList])
  return (
    <CustomDrawer
      open={open && !isInMission && !activeTag}
      handleClose={setClose}
      title='回報紀錄'
      closeButton
      fullHeight
    >
      {userAddTags ? (
        <List component='nav'>
          {userAddTags.map((item) => {
            return (
              <div key={item.id}>
                <ListItem>
                  <ListItemIcon>
                    <img
                      src={missionImages[0]}
                      alt='mission'
                      style={{ height: '35px', width: '35px' }}
                    />
                  </ListItemIcon>
                  <Grid container direction='column' space={1}>
                    <Grid
                      item
                      container
                      space={2}
                      direction='row'
                      alignItems='center'
                    >
                      <Typography variant='h6'>{item.locationName}</Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {item.statusHistory[0].createTime}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      space={2}
                      direction='row'
                      alignItems='center'
                    >
                      <Box className={classes.tag} mr={1} p={0.5}>
                        {item.category.subTypeName}
                      </Box>
                      <Box className={classes.tag} mr={1} p={0.5}>
                        {item.category.targetName}
                      </Box>
                    </Grid>
                  </Grid>
                  {item.archived === true ? (
                    <CustomButton
                      buttonType='roundButton_inactivated'
                      variant='contained'
                      size='small'
                      onClick={() => history.push(`${MAP_PATH}/${item.id}`)}
                    >
                      已封存
                    </CustomButton>
                  ) : (
                    <CustomButton
                      buttonType='roundButton_activated'
                      variant='contained'
                      size='small'
                      onClick={() => history.push(`${MAP_PATH}/${item.id}`)}
                    >
                      檢視
                    </CustomButton>
                  )}
                </ListItem>
                <Divider variant='middle' />
              </div>
            )
          })}
        </List>
      ) : (
        <CircularProgress color='primary' />
      )}
    </CustomDrawer>
  )
}

ReportHistory.propTypes = {
  control: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    setClose: PropTypes.func.isRequired
  }).isRequired
}

export default ReportHistory
