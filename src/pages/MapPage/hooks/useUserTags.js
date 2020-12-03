import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useState } from 'react'
import * as firebase from 'firebase/app'
import { generateTime } from './useTagDetail'

const GET_USER_TAGS_QUERY = gql`
  query getUserTags($uid: ID!) {
    userAddTagHistory(uid: $uid) {
      id
      locationName
      category {
        missionName
        subTypeName
        targetName
      }
      accessibility
      coordinates {
        latitude
        longitude
      }
      status {
        statusName
      }
      statusHistory {
        statusName
        createTime
      }
    }
  }
`

const reformatTagList = (data) => {
  const tagRenderList = data ? data.userAddTagHistory : []
  const filteredTags = tagRenderList.filter((tag) => {
    return tag.coordinates
  })
  const tagList = filteredTags.map((tag) => {
    const {
      id,
      locationName,
      accessibility,
      category: { missionName, subTypeName, targetName },
      coordinates: { latitude, longitude },
      status: { statusName }
    } = tag
    const statusHistory = tag.statusHistory.map((history) => {
      return {
        statusName: history.statusName,
        createTime: generateTime(history.createTime)
      }
    })
    return {
      id,
      locationName,
      accessibility,
      category: { missionName, subTypeName, targetName },
      position: {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      },
      status: { statusName },
      statusHistory
    }
  })
  return tagList
}

const useUserTags = () => {
  const uid = firebase.auth().currentUser ? firebase.auth().currentUser.uid : ''
  const [userAddTags, setUserAddTags] = useState(null)
  const { data, refetch } = useQuery(GET_USER_TAGS_QUERY, {
    // context: {
    //   headers: {
    //     authorization: token ? `Bearer ${token}` : ''
    //   }
    // },
    fetchPolicy: "no-cache",
    variables: {
      uid
    },
    onCompleted: () => {
      setUserAddTags(reformatTagList(data))
    }
  })
  
  const refetchUserAddTags = () => {
    //refetch
    refetch({fetchPolicy: "no-cache"}).then((d) => {
      setUserAddTags(reformatTagList(d.data))
    })
  }

  return { userAddTags, setUserAddTags, refetchUserAddTags}
}

export default useUserTags
