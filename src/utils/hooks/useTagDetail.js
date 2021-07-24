import { useMemo } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import moment from 'moment'

export const GET_TAG_DETAIL_QUERY = gql`
  query getTagDetail($id: ID!) {
    tag(tagId: $id) {
      id
      createTime
      locationName
      floor
      lastUpdateTime
      imageUrl
      status {
        numberOfUpVote
        hasUpVote
        statusName
        description
      }
      createUser {
        displayName
        uid
      }
      statusHistory {
        statusList {
          statusName
          createTime
          createUser {
            displayName
          }
          description
        }
      }
    }
  }
`

export const generateTime = (time) => {
  return moment(time).format('YYYY-MM-DD h:mm')
}

const tagDetailInitial = {
  id: null,
  createTime: '',
  lastUpdateTime: '',
  imageUrl: [],
  status: {
    numberOfUpVote: null,
    hasUpVote: null
  },
  createUser: {
    uid: '',
    displayName: ''
  },
  statusHistory: {
    statusList: []
  }
}

function useTagDetail() {
  // const [tagDetail, setTagDetail] = useState(null)
  const [getTagDetail, { data: { tag = {} } = {} }] = useLazyQuery(
    GET_TAG_DETAIL_QUERY,
    {
      fetchPolicy: 'no-cache'
    }
  )
  const tagDetail = useMemo(
    () => ({
      ...tagDetailInitial,
      ...tag,
      newCreateTime: generateTime(tag.createTime) || '0',
      newLastUpdateTime: generateTime(tag.lastUpdateTime) || '0'
    }),
    [tag]
  )
  return { tagDetail, getTagDetail }
}

export default useTagDetail
