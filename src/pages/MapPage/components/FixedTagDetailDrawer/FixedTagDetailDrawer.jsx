import React, { useEffect, useState } from 'react'
import { Lightbox } from 'react-modal-image'
import PropTypes from 'prop-types'
import DetailPart from './FixedTagDetailPart'
import ChangeStatus from './FixedTagChangeStatus'
import CustomDrawer from '../../../../components/CustomDrawer'
import UserDialog from '../UserDialog/UserDialog'
import useModal from '../../../../utils/hooks/useModal'
import EditHistory from './FixedTagEditHistory'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import MissionFab from '../Mission/MissionFab'

function FixedTagDetailDialog(props) {
  const { activeFixedTag, onClose } = props
  const { fetchFixedTagDetail } = useTagValue()
  const [largeImg, setLargeImg] = useState(null)
  const [stateDrawer, setStateDrawer] = useState(false)
  const [openHistory, setOpenHistory] = useState(false)
  const handleHistoryClose = () => {
    setOpenHistory(false)
  }
  const userDialogControl = useModal()
  const [checked, setChecked] = React.useState(true)
  const [fixedTagSubLocation, setFixedTagSubLocations] = useState(null)
  useEffect(() => {
    fetchFixedTagDetail()
  }, [fetchFixedTagDetail])
  return (
    <>
      <CustomDrawer
        open={activeFixedTag ? true : ' '}
        handleClose={onClose}
        fullHeight
        closeButton={false}
        title={activeFixedTag.locationName}
        variant='persistent'
      >
        <>
          <DetailPart
            activeFixedTag={activeFixedTag}
            setFixedTagSubLocations={setFixedTagSubLocations}
            setStateDrawer={setStateDrawer}
            setOpenHistory={setOpenHistory}
            userDialogControl={userDialogControl}
            setChecked={setChecked}
          />
          {fixedTagSubLocation && (
            <ChangeStatus
              fixedTagSubLocation={fixedTagSubLocation}
              setStateDrawer={setStateDrawer}
              stateDrawer={stateDrawer}
              setChecked={setChecked}
              checked={checked}
            />
          )}
          {fixedTagSubLocation && (
            <UserDialog
              userId={
                fixedTagSubLocation?.statusHistory?.statusList?.[0]?.createUser
                  ?.uid
              }
              control={userDialogControl}
            />
          )}
          {fixedTagSubLocation && (
            <EditHistory
              key={fixedTagSubLocation}
              openHistory={openHistory}
              fixedTagSubLocation={fixedTagSubLocation}
              handleHistoryClose={handleHistoryClose}
            />
          )}
          <MissionFab />
        </>
      </CustomDrawer>
      {largeImg && (
        <Lightbox
          large={largeImg}
          onClose={() => setLargeImg(null)}
          hideDownload
          hideZoom
        />
      )}
    </>
  )
}

FixedTagDetailDialog.propTypes = {
  activeFixedTag: PropTypes.object,
  onClose: PropTypes.func.isRequired
}
FixedTagDetailDialog.defaultProps = {
  activeFixedTag: null
}

export default FixedTagDetailDialog
