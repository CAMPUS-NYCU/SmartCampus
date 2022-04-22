import { useState, useEffect, useCallback } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

export const GET_FIXEDTAG_LIST_QUERY = gql`
  query getfixedTagList($cursor: String!, $pageSize: Int!) {
    fixedTagList(pageParams: { cursor: $cursor, pageSize: $pageSize }) {
      cursor
      empty
      fixedTags {
        id
        locationName
        coordinates {
          latitude
          longitude
        }
        viewCount
        fixedTagSubLocations {
          __typename
          ... on FixedTagPlace {
            id
            fixedTagId
            type
            floor
            name
            status {
              statusName
              createTime
              createUser {
                displayName
              }
              type
            }
            statusHistory {
              statusList {
                statusName
                createTime
                createUser {
                  displayName
                }
                type
              }
              empty
            }
          }
          ... on FixedTagFloor {
            id
            fixedTagId
            type
            floor
            status {
              statusName
              createTime
              type
            }
            statusHistory {
              statusList {
                statusName
                createTime
                type
              }
              empty
            }
          }
        }
      }
    }
  }
`

function useFixedTagList() {
  const [
    getfixedTagList,
    {
      data: {
        fixedTagList: { fixedTags = null, empty = false, cursor = null } = {}
      } = {}
    }
  ] = useLazyQuery(GET_FIXEDTAG_LIST_QUERY)
  const [fixedtagList, setfixedTagList] = useState(null)
  const [cachefixedTagList, setfixedCacheTagList] = useState(null)
  const fetchTagList = useCallback(
    (currentCursor, pageSize) => {
      getfixedTagList({ variables: { cursor: currentCursor || '', pageSize } })
    },
    [getfixedTagList]
  )
  useEffect(() => {
    fetchTagList('', 10)
  }, [fetchTagList])
  useEffect(() => {
    if (!empty && cursor) {
      fetchTagList(cursor, 100)
    }
  }, [fetchTagList, empty, cursor])
  useEffect(() => {
    if (Array.isArray(fixedTags)) {
      setfixedCacheTagList((prevState) => [...(prevState || []), ...fixedTags])
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
