import React, { useEffect, useState } from 'react'
import { Lightbox } from 'react-modal-image'
import PropTypes from 'prop-types'
import DetailPart from './FixedTagDetailPart'
import ChangeStatus from './FixedTagChangeStatus'
import CustomDrawer from '../../../../components/CustomDrawer'
import { useTagValue } from '../../../../utils/contexts/TagContext'

function FixedTagDetailDialog(props) {
  const { activeFixedTag, onClose } = props
  const { fetchFixedTagDetail } = useTagValue()
  const [largeImg, setLargeImg] = useState(null)
  const [stateDrawer, setStateDrawer] = useState(false)
  const [fixedTagSubLocation, setFixedTagSubLocations] = useState(null)
  useEffect(() => {
    fetchFixedTagDetail()
  }, [fetchFixedTagDetail])
  console.log(activeFixedTag)
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
          />
          {fixedTagSubLocation && (
            <ChangeStatus
              fixedTagSubLocation={fixedTagSubLocation}
              setStateDrawer={setStateDrawer}
              stateDrawer={stateDrawer}
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
