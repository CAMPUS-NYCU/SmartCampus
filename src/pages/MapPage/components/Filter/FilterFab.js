import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import FilterDrawer from './FilterDrawer'
import CustomButton from '../../../../components/CustomButton'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolgiute',
    top: 96,
    right: 24
  },
  grid: {
    position: 'absolute',
    transform: 'translate(-50%, 0)',
    top: 96,
    width: '100vw',
    height: '35px',
    flexGrow: '1',
    overflowX: 'scroll',
    overflowY: 'hidden',
    display: '-webkit-flex',
    flexDirection: 'row',
    maxWidth: 800,
    left: '50%',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '5vw'
    }
  },
  button: {
    flexShrink: '0',
    boxSizing: 'border-box',
    // width: '20vw',
    height: '30px',
    marginRight: '7px',
    color:'#686868',
    backgroundColor:'#EEEEEE'
  },
  addIcon: {
    marginLeft: '2px'
  },
  missionButton: {
    margin: theme.spacing(1)
  },
  discoveryButton: {
    margin: theme.spacing(1),
    boxSizing: 'content-box',
    width: 16,
    height: 16
  },
  discoveryIcon: {
    width: 16,
    height: 16
  }
}))

function FilterFab(props) {
  const classes = useStyles()
  const [filterDrawer, setFilterDrawer] = useState(false)
  const closeDrawer = () => {
    setFilterDrawer(false)
  }
  const { filterTags, addFilterTags, resetFilterTags } = useTagValue()
  const filterInfo = ['設施任務', '排隊情況']
  const { open } = props
  return (
    <>
      {open === true ? (
        <div className={classes.grid}>
          {/* <Button
            className={classes.button}
            variant='contained'
            size='small'
            color={filterDrawer ? 'primary' : 'default'}
            onClick={() => setFilterDrawer(true)}
          >
            加入其他
          </Button> */}
          <CustomButton
            className={classes.button}
            variant='contained'
            size='small'
            color={filterDrawer ? 'primary' : '#default'}
            onClick={() => setFilterDrawer(true)}
            children="加入其他"
          ></CustomButton>
          {filterTags.map((item) => {
            return (
              // <Button
              //   key={item}
              //   className={classes.button}
              //   variant='contained'
              //   size='small'
              //   onClick={() => addFilterTags(item)}
              //   color='primary'
              // >
              //   {item}
              //   <CloseIcon className={classes.addIcon} />
              // </Button>
              <CustomButton
                key={item}
                className={classes.button}
                variant='contained'
                size='small'
                color='primary'
                onClick={() => addFilterTags(item)}
              >
                {item}
                <CloseIcon className={classes.addIcon} />
              </CustomButton>
            )
          })}
          {filterTags.length === 0 &&
            filterInfo.map((item) => {
              return (
                // <Button
                //   key={item}
                //   className={classes.button}
                //   variant='contained'
                //   size='small'
                //   onClick={() => addFilterTags(item)}
                // >
                //   {item}

                // </Button>
                <CustomButton
                  key={item}
                  className={classes.button}
                  variant='contained'
                  size='small'
                  onClick={() => addFilterTags(item)}
                >
                  {item}
                </CustomButton>
              )
            })}
        </div>
      ) : (
        <>
          {filterTags.length > 0 &&
            open === false &&
            filterTags.map((item) => {
              return resetFilterTags(item)
            })}
        </>
      )}
      <FilterDrawer open={filterDrawer} onClose={closeDrawer} />
    </>
  )
}

export default FilterFab
