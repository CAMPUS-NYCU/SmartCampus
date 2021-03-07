import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useState } from 'react'
import { generateTime } from './useTagDetail'

export const GET_TAG_LIST_QUERY = gql`
  query getTagList {
    unarchivedTagList {
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
        description
      }
      statusHistory {
        statusName
        createTime
        createUser {
          displayName
        }
        description
      }
    }
  }
`

const reformatTagList = data => {
  const tagRenderList = data ? data.unarchivedTagList : []
  const filteredTags = tagRenderList.filter(tag => {
    return tag.coordinates
  })
  const tagList = filteredTags.map(tag => {
    const {
      id,
      locationName,
      accessibility,
      category: { missionName, subTypeName, targetName },
      coordinates: { latitude, longitude },
      status: { statusName, description }
    } = tag
    const statusHistory = tag.statusHistory.map(history => {
      return {
        statusName: history.statusName,
        createTime: generateTime(history.createTime),
        createUser: history.createUser,
        description: history.description
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
      status: { statusName, description },
      statusHistory
    }
  })
  return tagList
}

function useTagList () {
  const [tags, setTags] = useState(null)
  const { data, refetch } = useQuery(GET_TAG_LIST_QUERY, {
    onCompleted: () => {
      setTags(reformatTagList(data))
    }
  })
  // Reformat tags

  const updateTagList = dataIn => {
    setTags(reformatTagList(dataIn))
  }

  return { tags, refetch, updateTagList }
}

export default useTagList
