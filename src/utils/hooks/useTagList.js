import { useCallback, useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import useTagSubscription from './useTagsSubscription'

export const GET_TAG_LIST_QUERY = gql`
  query getTagList {
    unarchivedTagList {
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
      }
    }
  }
`

function useTagList() {
  const {
    data: { unarchivedTagList: { tags = [] } = {} } = {},
    refetch
  } = useQuery(GET_TAG_LIST_QUERY, {})
  const newTag = useTagSubscription()
  const [tagList, setTagList] = useState(null)
  const updateTagList = useCallback(() => {
    setTimeout(async () => {
      refetch()
      updateTagList()
    }, 30000)
  }, [refetch])
  useEffect(() => {
    setTagList(tags)
  }, [tags])
  useEffect(() => {
    if (newTag.changeType === 'added') {
      setTagList((prevTagList) => [...prevTagList, newTag.tagContent])
    }
    if (newTag.changeType === 'archived') {
      setTagList((prevTagList) =>
        prevTagList.filter((tag) => tag.id !== newTag.tagContent.id)
      )
    }
  }, [newTag])
  return { tags: tagList, refetch, updateTagList }
}

export default useTagList
