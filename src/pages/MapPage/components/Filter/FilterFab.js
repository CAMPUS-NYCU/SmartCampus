import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import FilterDrawer from './FilterDrawer'
import CustomButton from '../../../../components/CustomButton'

const useStyles = makeStyles((theme) => ({
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
  button: {},
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
  const filterInfo = ['設施任務', '問題任務', '動態任務']
  const { open } = props
  return (
    <>
      {open === true ? (
        <div className={classes.grid}>
          <CustomButton
            buttonType={
              filterDrawer ? 'boxButton_activated' : 'boxButton_inactivated'
            }
            variant='contained'
            size='small'
            onClick={() => setFilterDrawer(true)}
            style={{
              flexShrink: '0',
              boxSizing: 'border-box',
              // width: '20vw',
              height: '30px',
              marginRight: '7px'
            }}
          >
            加入其他
          </CustomButton>
          {filterTags.map((item) => {
            return (
              <CustomButton
                key={item}
                buttonType='boxButton_activated'
                variant='contained'
                size='small'
                onClick={() => addFilterTags(item)}
                style={{
                  flexShrink: '0',
                  boxSizing: 'border-box',
                  // width: '20vw',
                  height: '30px',
                  marginRight: '7px'
                }}
              >
                {item}
                <CloseIcon
                  className={classes.addIcon}
                  style={{ width: '15px' }}
                />
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
                  buttonType='boxButton_inactivated'
                  variant='contained'
                  size='small'
                  onClick={() => addFilterTags(item)}
                  style={{
                    flexShrink: '0',
                    boxSizing: 'border-box',
                    // width: '20vw',
                    height: '30px',
                    marginRight: '7px'
                  }}
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
