import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useState } from 'react'
import { generateTime } from './useTagDetail'

export const GET_TAG_LIST_QUERY = gql`
  query getTagList {
    tagRenderList {
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
        createUser{
          displayName
        }
        description
      }
    }
  }
`

const reformatTagList = (data) => {
  const tagRenderList = data ? data.tagRenderList : []
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
      status: { statusName },
      statusHistory
    }
  })
  return tagList
}

function useTagList() {
  const { data, refetch } = useQuery(GET_TAG_LIST_QUERY, {
    onCompleted: () => {
      setTags(tagList)
    }
  })
  // Reformat tags
  const tagList = reformatTagList(data)
  const [tags, setTags] = useState(tagList)
  const updateTagList = (dataIn) => {
    setTags(reformatTagList(dataIn))
  }

  return { tags, refetch, updateTagList }
}

export default useTagList
