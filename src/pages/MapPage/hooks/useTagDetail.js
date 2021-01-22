import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useState } from 'react'
import * as firebase from 'firebase/app'

export const GET_TAG_DETAIL_QUERY = gql`
  query getTagDetail($id: ID!) {
    tag(id: $id) {
      id
      createTime
      lastUpdateTime
      description
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

function useTagDetail(id) {
  const [token, setToken] = useState('')
  const [tagDetail, setTagDetail] = useState(null)
  if (firebase.auth().currentUser) {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((t) => {
        setToken(t)
      })
  }
  const { data: { tag = null } = {}, refetch } = useQuery(
    GET_TAG_DETAIL_QUERY,
    {
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      },
      fetchPolicy: 'no-cache',
      variables: { id },
      onCompleted: () => {
        setTagDetail({
          ...tag,
          newCreateTime: generateTime(tag.createTime),
          newLastUpdateTime: generateTime(tag.lastUpdateTime)
        })
      }
    }
  )
  const refetchTagDetail = () => {
    refetch({ fetchPolicy: 'no-cache' })
  }
  return { tagDetail, setTagDetail, refetchTagDetail }
}

export default useTagDetail
