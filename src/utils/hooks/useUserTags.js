import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import * as firebase from 'firebase/app'
import { generateTime } from './useTagDetail'

const GET_USER_TAGS_QUERY = gql`
  query getUserTags($uid: ID!) {
    userAddTagHistory(uid: $uid) {
      tags {
        id
        locationName
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
      category: { missionName, subTypeName, targetName },
      status: { statusName, numberOfUpVote },
      statusHistory
    }
  })
  return tagList
}

const useUserTags = () => {
  const uid = firebase.auth().currentUser ? firebase.auth().currentUser.uid : ''
  const [userAddTags, setUserAddTags] = useState(null)
  const { data, refetch } = useQuery(GET_USER_TAGS_QUERY, {
    fetchPolicy: 'no-cache',
    variables: {
      uid
    },
    onCompleted: () => {
      setUserAddTags(reformatTagList(data))
    }
  })

  const refetchUserAddTags = () => {
    // refetch
    refetch({ fetchPolicy: 'no-cache' }).then((d) => {
      setUserAddTags(reformatTagList(d.data))
    })
  }

  return { userAddTags, setUserAddTags, refetchUserAddTags }
}

export default useUserTags
