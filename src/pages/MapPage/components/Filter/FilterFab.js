import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { useTagValue } from '../../contexts/TagContext'
import FilterDrawer from './FilterDrawer'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    top: 96,
    right: 24
  },
  grid: {
    position: 'absolute',
    transform: 'translate(-50%, 0)',
    top: 96,
    width: '100vw',
    height: '35px',
    webkitFlexGrow: '1',
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
    border: '1px solid #BABABA',
    flexShrink: '0',
    boxSizing: 'border-box',
    borderRadius: '40px',
    // width: '20vw',
    height: '30px',
    marginRight: '7px'
  },
  addIcon: {
    marginLeft: '2px'
  },
  missionButton: {
    border: 'solid 1px #707070',
    margin: theme.spacing(1)
  },
  discoveryButton: {
    border: 'solid 1px #707070',
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

function FilterFab (props) {
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
          <Button
            className={classes.button}
            variant='contained'
            size='small'
            color={filterDrawer ? 'primary' : ''}
            onClick={() => setFilterDrawer(true)}
            //disabled
          >
            加入其他
            <AddIcon className={classes.addIcon} />
          </Button>
          {filterTags.map(item => {
            return (
              <Button
                className={classes.button}
                variant='contained'
                size='small'
                onClick={() => addFilterTags(item)}
                color='primary'
                //disabled
              >
                {item}
                <CloseIcon className={classes.addIcon} />
              </Button>
            )
          })}
          {filterTags.length === 0 &&
            filterInfo.map(item => {
              return (
                <Button
                  className={classes.button}
                  variant='contained'
                  size='small'
                  onClick={() => addFilterTags(item)}
                  //disabled
                >
                  {item}
                  <AddIcon className={classes.addIcon} />
                </Button>
              )
            })}
        </div>
      ) : (
        <>
          {filterTags.length > 0 &&
            open === false &&
            filterTags.map(item => {
              return resetFilterTags(item)
            })}
        </>
      )}
      <FilterDrawer open={filterDrawer} onClose={closeDrawer} />
    </>
  )
}

export default FilterFab
