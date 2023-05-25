import { useState, useEffect, useCallback } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import moment from 'moment'

import { useUserValue } from '../contexts/UserContext'

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
        userAddTagNumber
      }
      statusHistory {
        statusList {
          statusName
          createTime
          createUser {
            displayName
            uid
            userAddTagNumber
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
  const { token, uid } = useUserValue()
  const [tagDetail, setTagDetail] = useState(tagDetailInitial)
  const [getTagDetail, { data: { tag = {} } = {} }] = useLazyQuery(
    GET_TAG_DETAIL_QUERY,
    {
      fetchPolicy: 'no-cache',
      ...(uid && {
        context: { headers: { authorization: `Bearer ${token}` } }
      })
    }
  )
  useEffect(() => {
    if (tag?.id) {
      setTagDetail({
        ...tagDetailInitial,
        ...tag,
        newCreateTime: generateTime(tag.createTime) || '0',
        newLastUpdateTime: generateTime(tag.lastUpdateTime) || '0'
      })
    }
  }, [tag])
  const resetTagDetail = useCallback(() => {
    setTagDetail(tagDetailInitial)
  }, [])
  return { tagDetail, getTagDetail, resetTagDetail }
}

export default useTagDetail
