import { useState, useEffect, useCallback } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { useUserValue } from '../contexts/UserContext'

export const GET_FIXEDTAG_LIST_QUERY = gql`
  query getfixedTagList($uNumber: Int!, $cursor: String!, $pageSize: Int!) {
    getUserFixedTagResearchList(
      uNumber: $uNumber
      pageParams: { cursor: $cursor, pageSize: $pageSize }
    ) {
      fixedTags {
        id
        locationName
        coordinates {
          latitude
          longitude
        }
        tags {
          id
          fixedTagId
          locationName
          floor
          category {
            categoryType
            categoryName
            categoryDescName
            locationImgUrl
          }
          coordinates {
            latitude
            longitude
          }
          status {
            statusName
            statusDescName
            createTime
          }
          statusHistory {
            statusList {
              statusName
              statusDescName
              createTime
            }
            empty
          }
        }
      }
      cursor
      empty
    }
  }
`

function getUserNumberResearch(userName) {
  if (userName) {
    const numberMatch = userName.match(/\d+/)

    if (numberMatch) {
      return parseInt(numberMatch[0], 10)
    }
    return 0
  }
  return -1
}

function useFixedTagList() {
  const [
    getfixedTagList,
    {
      data: {
        getUserFixedTagResearchList: {
          fixedTags = null,
          empty = false,
          cursor = null
        } = {}
      } = {}
    }
  ] = useLazyQuery(GET_FIXEDTAG_LIST_QUERY)
  const [fixedtagList, setfixedTagList] = useState(null)
  const [cachefixedTagList, setfixedCacheTagList] = useState(null)
  const { userName } = useUserValue()
  const fetchTagList = useCallback(
    (uNumber, currentCursor, pageSize) => {
      getfixedTagList({
        variables: { uNumber, cursor: currentCursor || '', pageSize }
      })
    },
    [getfixedTagList]
  )
  useEffect(() => {
    fetchTagList(getUserNumberResearch(userName), '', 10)
  }, [fetchTagList, userName])
  useEffect(() => {
    if (!empty && cursor) {
      fetchTagList(getUserNumberResearch(userName), cursor, 100)
    }
  }, [fetchTagList, empty, cursor, userName])
  useEffect(() => {
    if (Array.isArray(fixedTags)) {
      setfixedCacheTagList((prevState) => [
        ...(prevState || []).filter(
          (fixedTag) => !fixedTags.map((t) => t.id).includes(fixedTag.id)
        ),
        ...fixedTags
      ])
    }
  }, [fixedTags, empty, cursor])
  useEffect(() => {
    if (cachefixedTagList && (empty || cachefixedTagList.length === 10)) {
      setfixedTagList(cachefixedTagList)
    }
  }, [cachefixedTagList, empty])
  return { fixedTags: fixedtagList }
}

export default useFixedTagList
