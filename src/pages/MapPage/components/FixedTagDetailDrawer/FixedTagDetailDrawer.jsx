import React from 'react'
import PropTypes from 'prop-types'
import DetailPart from './FixedTagDetailPart'
import CustomDrawer from '../../../../components/CustomDrawer'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import MissionFab from '../Mission/MissionFab'

function FixedTagDetailDialog(props) {
  const { activeFixedTag, onClose } = props
  const { fetchFixedTagDetail } = useTagValue()
  React.useEffect(() => {
    fetchFixedTagDetail()
  }, [fetchFixedTagDetail])
  return (
    <CustomDrawer
      open={activeFixedTag ? true : ' '}
      handleClose={onClose}
      fullHeight
      closeButton={false}
      title={`${activeFixedTag.locationName}現有回報資訊`}
      variant='persistent'
    >
      <>
        <DetailPart activeFixedTag={activeFixedTag} />
        <MissionFab />
      </>
    </CustomDrawer>
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
