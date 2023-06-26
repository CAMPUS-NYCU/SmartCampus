import React from 'react'
import { Button } from '@mui/material'
import { useMissionValue } from '../../../../../utils/contexts/MissionContext'
import { useUserValue } from '../../../../../utils/contexts/UserContext'

const MissionFab = () => {
  const { handleStartMission } = useMissionValue()
  const { isGuest, signOut } = useUserValue()
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
      onClick={isGuest ? signOut : handleStartMission}
    >
      新增回報
    </Button>
  )
}

export default MissionFab
