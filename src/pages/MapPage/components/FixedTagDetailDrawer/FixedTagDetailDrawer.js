import React, { useEffect, useState } from 'react'
import { Lightbox } from 'react-modal-image'
import PropTypes from 'prop-types'
import DetailPart from './DetailPart'
import CustomDrawer from '../../../../components/CustomDrawer'
import { useTagValue } from '../../../../utils/contexts/TagContext'

function TagDetailDialog(props) {
  const { activeFixedTag, onClose, fixedtagDetail } = props
  const { fetchFixedTagDetail } = useTagValue()
  const [largeImg, setLargeImg] = useState(null)
  useEffect(() => {
    fetchFixedTagDetail()
  }, [fetchFixedTagDetail])
  return (
    <>
      <CustomDrawer
        open={activeFixedTag}
        handleClose={onClose}
        fullHeight
        closeButton={false}
        title={activeFixedTag.locationName}
      >
        <DetailPart
          fixedtagDetail={fixedtagDetail}
          activeFixedTag={activeFixedTag}
        />
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

TagDetailDialog.propTypes = {
  activeFixedTag: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  fixedtagDetail: PropTypes.object.isRequired
}
TagDetailDialog.defaultProps = {
  activeFixedTag: null
}

export default TagDetailDialog
