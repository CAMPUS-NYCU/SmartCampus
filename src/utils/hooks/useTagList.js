import { useState, useEffect, useCallback } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

import useTagSubscription from './useTagsSubscription'

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
        unarchivedTagList: { tags = [], empty = false, cursor = '' } = {}
      } = {}
    }
  ] = useLazyQuery(GET_TAG_LIST_QUERY)
  const newTag = useTagSubscription()
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
    if (Array.isArray(tags) && tags.length !== 0)
      setTagList((prevState) => [...(prevState || []), ...tags])
  }, [tags])
  useEffect(() => {
    if (newTag.changeType === 'updated') {
      setTagList((prevTagList) => {
        const target = prevTagList.find(
          (tag) => tag.id === newTag.tagContent.id
        )
        return [
          ...prevTagList.filter((tag) => tag.id !== newTag.tagContent.id),
          { ...target, ...newTag.tagContent }
        ]
      })
    }
    if (newTag.changeType === 'added') {
      setTagList((prevTagList) => [...prevTagList, newTag.tagContent])
    }
    if (newTag.changeType === 'archived' || newTag.changeType === 'deleted') {
      setTagList((prevTagList) =>
        prevTagList.filter((tag) => tag.id !== newTag.tagContent.id)
      )
    }
  }, [newTag])
  return { tags: tagList }
}

export default useTagList
