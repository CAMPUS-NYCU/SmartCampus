import { useState, useEffect, useCallback } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

export const GET_FIXEDTAG_LIST_QUERY = gql`
  query getfixedTagList($cursor: String!, $pageSize: Int!) {
    fixedTagResearchList(pageParams: { cursor: $cursor, pageSize: $pageSize }) {
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

function useFixedTagList() {
  const [
    getfixedTagList,
    {
      data: {
        fixedTagResearchList: {
          fixedTags = null,
          empty = false,
          cursor = null
        } = {}
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
