import React from 'react'
import { Drawer } from '@material-ui/core'

const ReportHistory = (props) => {
  const {
    control: { open, setClose }
  } = props
  console.log('history', open)
  return (
    <Drawer
      anchor='bottom'
      variant='persistent'
      open={open}
      onClose={setClose}
      PaperProps={{
        style: {
          borderRadius: '20px 20px 0 0',
          backgroundColor: '#FAFAFA'
        }
      }}
    >
      <div style={{ height: '50vh' }}>hi</div>
    </Drawer>
  )
}

export default ReportHistory
