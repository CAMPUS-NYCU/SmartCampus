import React from 'react'
import { Button } from '@mui/material'
import { useMissionValue } from '../../../../../utils/contexts/MissionContext'
import { useUserValue } from '../../../../../utils/contexts/UserContext'

function removeTrailingLetters(input) {
  return input.replace(/[a-zA-Z]$/, '')
}

const MissionFab = (props) => {
  const { activeFixedTag } = props
  const { setFixedTagId, setLocationName, handleStartMission } =
    useMissionValue()
  const { isGuest, signOut } = useUserValue()

  const handleClick = () => {
    if (isGuest) {
      signOut()
    } else {
      setFixedTagId(activeFixedTag.id)
      setLocationName(removeTrailingLetters(activeFixedTag.locationName))
      handleStartMission(activeFixedTag)
    }
  }
  return (
    <Button
      display='flex'
      style={{
        background: '#FDCC4F',
        fontSize: '14px',
        borderRadius: '20px',
        width: '100px',
        alignSelf: 'center',
        margin: '-10px 0 10px 0'
      }}
      variant='contained'
      onClick={handleClick}
    >
      新增回報
    </Button>
  )
}

export default MissionFab
