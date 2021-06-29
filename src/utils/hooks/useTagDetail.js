import { useMemo } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

export const GET_TAG_DETAIL_QUERY = gql`
  query getTagDetail($id: ID!) {
    tag(tagId: $id) {
      id
      createTime
      lastUpdateTime
      imageUrl
      status {
        numberOfUpVote
        hasUpVote
      }
      createUser {
        displayName
      }
    }
  }
`

export const generateTime = (time) => {
  console.log(time)
  const times = time.split(' ')
  let month = 0
  switch (times[1]) {
    case 'Jan':
      month = 1
      break
    case 'Feb':
      month = 2
      break
    case 'Mar':
      month = 3
      break
    case 'Apr':
      month = 4
      break
    case 'May':
      month = 5
      break
    case 'Jun':
      month = 6
      break
    case 'Jul':
      month = 7
      break
    case 'Aug':
      month = 8
      break
    case 'Sep':
      month = 9
      break
    case 'Oct':
      month = 10
      break
    case 'Nov':
      month = 11
      break
    case 'Dec':
      month = 12
      break
    default:
      month = 0
      break
  }
  return `${times[3]}-${month}-${times[2]} ${times[4]}`
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
    displayName: ''
  }
}

function useTagDetail() {
  // const [tagDetail, setTagDetail] = useState(null)
  const [getTagDetail, { data: { tag = null } = {} }] = useLazyQuery(
    GET_TAG_DETAIL_QUERY,
    {
      fetchPolicy: 'no-cache'
    }
  )
  const tagDetail = useMemo(
    () => ({
      ...tagDetailInitial,
      ...tag,
      newCreateTime: '0',
      newLastUpdateTime: '0'
    }),
    [tag]
  )
  return { tagDetail, getTagDetail }
}

export default useTagDetail
