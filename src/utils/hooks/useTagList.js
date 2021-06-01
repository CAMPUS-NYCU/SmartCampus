import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { generateTime } from './useTagDetail'

export const GET_TAG_LIST_QUERY = gql`
  query getTagList {
    unarchivedTagList {
      tags {
        id
        locationName
        floor
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
          statusList {
            statusName
            createTime
            createUser {
              displayName
            }
            description
          }
        }
      }
    }
  }
`

const reformatTagList = (data) => {
  const tagRenderList = data ? data.unarchivedTagList.tags : []
  const filteredTags = tagRenderList.filter((tag) => {
    return tag.coordinates
  })
  const tagList = filteredTags.map((tag) => {
    const {
      id,
      locationName,
      accessibility,
      floor,
      category: { missionName, subTypeName, targetName },
      coordinates: { latitude, longitude },
      status: { statusName, description }
    } = tag
    const statusHistory = tag.statusHistory.statusList.map((history) => {
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
      floor,
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

function useTagList() {
  const { data, refetch } = useQuery(GET_TAG_LIST_QUERY, {})
  const [tagList, setTagList] = useState(null)
  const updateTagList = useCallback(() => {
    setTimeout(async () => {
      refetch()
      updateTagList()
    }, 30000)
  }, [refetch])
  useEffect(() => {
    setTagList(reformatTagList(data))
  }, [data])
  return { tags: tagList, refetch, updateTagList }
}

export default useTagList
