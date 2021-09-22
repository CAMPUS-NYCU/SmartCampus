import { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

import { generateTime } from './useTagDetail'

const GET_USER_TAGS_QUERY = gql`
  query getUserTags($uid: ID!) {
    userAddTagHistory(uid: $uid) {
      tags {
        id
        locationName
        archived
        category {
          missionName
          subTypeName
          targetName
        }
        status {
          statusName
          numberOfUpVote
        }
        statusHistory {
          statusList {
            statusName
            createTime
          }
        }
      }
    }
  }
`

const reformatTagList = (data) => {
  const tagRenderList = data ? data.userAddTagHistory.tags : []
  const tagList = tagRenderList.map((tag) => {
    const {
      id,
      locationName,
      archived,
      category: { missionName, subTypeName, targetName },
      status: { statusName, numberOfUpVote }
    } = tag
    const statusHistory = tag.statusHistory.statusList.map((history) => {
      return {
        statusName: history.statusName,
        createTime: generateTime(history.createTime)
      }
    })
    return {
      id,
      locationName,
      archived,
      category: { missionName, subTypeName, targetName },
      status: { statusName, numberOfUpVote },
      statusHistory
    }
  })
  return tagList
}

const useUserTags = () => {
  const [userAddTags, setUserAddTags] = useState(null)
  const [getUserTagList, { data }] = useLazyQuery(GET_USER_TAGS_QUERY, {
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      setUserAddTags(reformatTagList(data))
    }
  })

  return { userAddTags, setUserAddTags, getUserTagList }
}

export default useUserTags
