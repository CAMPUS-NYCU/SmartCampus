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
      >
        <>
          <DetailPart
            activeFixedTag={activeFixedTag}
            setFixedTagSubLocations={setFixedTagSubLocations}
            fixedTagSubLocation={fixedTagSubLocation}
            setStateDrawer={setStateDrawer}
            setOpenHistory={setOpenHistory}
            userDialogControl={userDialogControl}
          />
          {fixedTagSubLocation && (
            <ChangeStatus
              fixedTagSubLocation={fixedTagSubLocation}
              setStateDrawer={setStateDrawer}
              stateDrawer={stateDrawer}
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
              openHistory={openHistory}
              fixedTagSubLocation={fixedTagSubLocation}
              handleHistoryClose={handleHistoryClose}
            />
          )}
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
