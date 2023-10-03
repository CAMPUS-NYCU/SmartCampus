import { useState, useEffect, useCallback } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { useUserValue } from '../contexts/UserContext'

export const GET_TAG_LIST_QUERY = gql`
  query getTagList($cursor: String!, $pageSize: Int!) {
    unarchivedTagListResearch(
      pageParams: { cursor: $cursor, pageSize: $pageSize }
    ) {
      cursor
      empty
      tags {
        id
        fixedTagId
        createUser {
          uid
        }
        locationName
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
        }
        statusHistory {
          statusList {
            statusName
            statusDescName
            createTime
          }
          cursor
          empty
        }
        floor
        archived
      }
    }
  }
`

function useTagList() {
  const [fetched, setFetched] = useState(false)
  const [
    getTagList,
    {
      data: {
        unarchivedTagListResearch: {
          tags = [],
          empty = false,
          cursor = null
        } = {}
      } = {}
    }
  ] = useLazyQuery(GET_TAG_LIST_QUERY)
  const [tagList, setTagList] = useState([])
  const [cacheTagList, setCacheTagList] = useState([])
  const { uid } = useUserValue()
  const fetchTagList = useCallback(
    (currentCursor, pageSize) => {
      getTagList({ variables: { cursor: currentCursor || '', pageSize } })
    },
    [getTagList]
  )
  useEffect(() => {
    if (uid && !fetched) {
      fetchTagList('', 10)
      setFetched(true)
    }
  }, [fetchTagList, fetched, uid])
  useEffect(() => {
    if (!empty && cursor) {
      fetchTagList(cursor, 100)
    }
  }, [fetchTagList, empty, cursor])
  useEffect(() => {
    if (tags.length !== 0) {
      setCacheTagList((prevState) => [
        ...(prevState || []).filter(
          (tag) => !tags.map((t) => t.id).includes(tag.id)
        ),
        ...tags
      ])
    }
  }, [tags, empty, cursor])
  useEffect(() => {
    if (cacheTagList && (empty || cacheTagList.length === 10)) {
      const copiedTagList = cacheTagList.filter(
        (tag) =>
          tag.createUser.uid === 'JDh8VD63kVOxqOvAnfrewhFjqNt2' ||
          tag.createUser.uid === uid
      )
      setTagList(copiedTagList)
    }
  }, [cacheTagList, empty, uid])
  return { tags: tagList, setTagList }
}

export default useTagList
