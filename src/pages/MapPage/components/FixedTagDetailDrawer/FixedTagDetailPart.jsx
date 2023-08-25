import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Box, Button } from '@mui/material'
import Grid from '@mui/material/Grid'
import { MAP_PATH } from '../../../../constants/pageUrls'
import changeImage from '../../../../assets/images/fixedTagChange.svg'
import { useTagValue } from '../../../../utils/contexts/TagContext'

const DetailPartItem = (props) => {
  const { tag } = props
  const history = useHistory()
  const myRef = React.useRef(null)

  const { highlightTagId, setHighLightTagId } = useTagValue()
  const isHighlighted = tag.id === highlightTagId
  React.useEffect(() => {
    if (isHighlighted) {
      myRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
    }
  }, [isHighlighted])

  return (
    <Grid
      key={tag.id}
      ref={myRef}
      container
      spacing={2}
      style={{
        backgroundColor: isHighlighted ? '#888888' : '#EEEEEE',
        borderRadius: '10px',
        margin: '5px',
        width: '98%'
      }}
      justifyContent='center'
      alignItems='center'
    >
      <Grid
        item
        xs={6}
        style={{
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '14px',
          lineHeight: '12px',
          letterSpacing: '0.75px',
          textTransform: 'uppercase'
        }}
      >
        地點: {tag.locationName}
      </Grid>
      <Grid
        item
        xs={4}
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {tag.floor && (
          <Button
            id='floorButton'
            size='small'
            style={{
              borderRadius: '20px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
            }}
            variant='contained'
          >
            樓層: {tag.floor}
          </Button>
        )}
      </Grid>
      <Grid
        item
        xs={4}
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
          id='changeStatusButton'
          size='small'
          style={{
            background: '#FDCC4F',
            fontSize: '12px',
            borderRadius: '20px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
          }}
          variant='contained'
          onClick={() => {
            alert('[TODO]: 編輯')
          }}
        >
          <img src={changeImage} alt='' />
          &nbsp;編輯
        </Button>
        <Button
          id='highlightButton'
          size='small'
          style={{
            background: '#FDCC4F',
            fontSize: '12px',
            borderRadius: '20px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
          }}
          variant='contained'
          onClick={() => {
            setHighLightTagId(tag.id)
          }}
        >
          標記
        </Button>
        <Button
          id='highlightButton'
          size='small'
          style={{
            background: '#FDCC4F',
            fontSize: '12px',
            borderRadius: '20px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
          }}
          variant='contained'
          onClick={() => {
            history.push(`${MAP_PATH}/tag/${tag.id}`)
          }}
        >
          選取
        </Button>
      </Grid>
    </Grid>
  )
}

const DetailPart = (props) => {
  const { tags } = props
  return (
    <Box
      display='flex'
      flexDirection='column'
      m={2}
      style={{
        overflowX: 'hidden',
        overflowY: 'scroll',
        height: '80%',
        width: '90%',
        marginTop: '10px'
      }}
    >
      {tags.map((tag) => (
        <DetailPartItem key={tag.id} tag={tag} />
      ))}
    </Box>
  )
}

DetailPart.propTypes = {
  tags: PropTypes.array.isRequired
}

export default DetailPart
