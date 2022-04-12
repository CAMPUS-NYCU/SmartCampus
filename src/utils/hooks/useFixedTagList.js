import { useState, useEffect, useCallback } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

export const GET_TAG_LIST_QUERY = gql`
  query getFixedTagList($cursor: String!, $pageSize: Int!) {
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
        information {
          __typename
          ... on FixedTagRestaurantStoreInfo {
            id
            type
            floor
            name
            status
          }
          ... on FixedTagFloorInfo {
            id
            type
            floor
            status
          }
        }
      }
    }
  }
`

function useFixedTagList() {
  const [
    getFixedTagList,
    {
      data: {
        unarchivedTagList: { tags = null, empty = false, cursor = null } = {}
      } = {}
    }
  ] = useLazyQuery(GET_TAG_LIST_QUERY)
  const [fixedtagList, setFixedTagList] = useState(null)
  const [fixedcacheTagList, setFixedCacheTagList] = useState(null)
  const fetchTagList = useCallback(
    (currentCursor, pageSize) => {
      getFixedTagList({ variables: { cursor: currentCursor || '', pageSize } })
    },
    [getFixedTagList]
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
    if (Array.isArray(tags)) {
      setFixedCacheTagList((prevState) => [...(prevState || []), ...tags])
    }
  }, [tags, empty, cursor])
  useEffect(() => {
    if (fixedcacheTagList && (empty || fixedcacheTagList.length === 10)) {
      setFixedTagList(fixedcacheTagList)
    }
  }, [fixedcacheTagList, empty])
  return { tags: fixedtagList, setFixedTagList }
}

export default useFixedTagList
