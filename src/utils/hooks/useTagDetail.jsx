import { useState, useEffect, useCallback } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import moment from 'moment'

import { useUserValue } from '../contexts/UserContext'

export const GET_TAG_DETAIL_QUERY = gql`
  query getTagDetail($id: ID!) {
    tagResearch(tagId: $id) {
      id
      createTime
      locationName
      floor
      lastUpdateTime
      imageUrl
      status {
        statusName
        statusDescName
      }
      createUser {
        displayName
        uid
      }
      category {
        categoryType
        categoryName
        categoryDescName
        locationImgUrl
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
  floor: '',
  lastUpdateTime: '',
  imageUrl: [],
  status: {
    statusName: '',
    statusDescName: ''
  },
  createUser: {
    uid: '',
    displayName: ''
  },
  category: {
    categoryType: '',
    categoryName: '',
    categoryDescName: '',
    locationImgUrl: []
  }
}

function useTagDetail() {
  const { token, uid } = useUserValue()
  const [tagDetail, setTagDetail] = useState(tagDetailInitial)
  const [getTagDetail, { data: { tagResearch = {} } = {} }] = useLazyQuery(
    GET_TAG_DETAIL_QUERY,
    {
      fetchPolicy: 'no-cache',
      ...(uid && {
        context: { headers: { authorization: `Bearer ${token}` } }
      })
    }
  )
  useEffect(() => {
    if (tagResearch?.id) {
      setTagDetail({
        ...tagDetailInitial,
        ...tagResearch,
        newCreateTime: generateTime(tagResearch.createTime) || '0',
        newLastUpdateTime: generateTime(tagResearch.lastUpdateTime) || '0'
      })
    }
  }, [tagResearch])
  const resetTagDetail = useCallback(() => {
    setTagDetail(tagDetailInitial)
  }, [])
  return { tagDetail, getTagDetail, resetTagDetail }
}

export default useTagDetail
