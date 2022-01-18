import { useState, useEffect, useCallback } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

export const GET_TAG_LIST_QUERY = gql`
  query getTagList($cursor: String!, $pageSize: Int!) {
    unarchivedTagList(pageParams: { cursor: $cursor, pageSize: $pageSize }) {
      cursor
      empty
      tags {
        id
        category {
          missionName
          subTypeName
          targetName
        }
        coordinates {
          latitude
          longitude
        }
        lastUpdateTime
        status {
          statusName
          numberOfUpVote
        }
      }
    }
  }
`

function useTagList() {
  const [
    getTagList,
    {
      data: {
        unarchivedTagList: { tags = null, empty = false, cursor = null } = {}
      } = {}
    }
  ] = useLazyQuery(GET_TAG_LIST_QUERY)
  const [tagList, setTagList] = useState(null)
  const [cacheTagList, setCacheTagList] = useState(null)
  const fetchTagList = useCallback(
    (currentCursor, pageSize) => {
      getTagList({ variables: { cursor: currentCursor || '', pageSize } })
    },
    [getTagList]
  )
  useEffect(() => {
    fetchTagList('', 10)
  }, [fetchTagList])
  useEffect(() => {
    if (!empty && cursor) {
      fetchTagList(cursor, 50)
    }
  }, [fetchTagList, empty, cursor])
  useEffect(() => {
    if (Array.isArray(tags)) {
      setCacheTagList((prevState) => [...(prevState || []), ...tags])
    }
  }, [tags, empty, cursor])
  useEffect(() => {
    if (cacheTagList && (empty || cacheTagList.length === 10)) {
      setTagList(cacheTagList)
    }
  }, [cacheTagList, empty])
  return { tags: tagList, setTagList }
}

export default useTagList
