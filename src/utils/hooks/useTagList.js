import { useState, useEffect } from 'react'
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
  const {
    data: { unarchivedTagList: { tags = [] } = {} } = {},
    refetch
  } = useQuery(GET_TAG_LIST_QUERY, {
    onCompleted: () => {
      setTagList(tags)
    }
  })
  const newTag = useTagSubscription()
  const [tagList, setTagList] = useState(null)
  const updateTagList = () => {
    setTimeout(async () => {
      refetch()
      updateTagList()
    }, 30000)
  }
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
  return { tags: tagList, refetch, updateTagList }
}

export default useTagList
