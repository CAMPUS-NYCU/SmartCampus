import { useState, useEffect, useCallback } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

export const GET_TAG_LIST_QUERY = gql`
  query getTagList($cursor: String!) {
    unarchivedTagList(pageParams: { cursor: $cursor }) {
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
        unarchivedTagList: { tags = null, empty = false, cursor = '' } = {}
      } = {}
    }
  ] = useLazyQuery(GET_TAG_LIST_QUERY)
  const [tagList, setTagList] = useState(null)
  const fetchTagList = useCallback(
    (currentCursor) => {
      getTagList({ variables: { cursor: currentCursor || '' } })
    },
    [getTagList]
  )
  useEffect(() => {
    fetchTagList('')
  }, [fetchTagList])
  useEffect(() => {
    if (!empty && cursor) {
      fetchTagList(cursor)
    }
  }, [fetchTagList, empty, cursor])
  useEffect(() => {
    if (Array.isArray(tags))
      setTagList((prevState) => [...(prevState || []), ...tags])
  }, [tags])
  return { tags: tagList, setTagList }
}

export default useTagList
