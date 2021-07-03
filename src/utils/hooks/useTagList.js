import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

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

const reformatTagList = (tags) => {
  const tagList = tags.map((tag) => {
    const {
      id,
      locationName,
      category: { missionName, subTypeName, targetName },
      coordinates: { latitude, longitude }
    } = tag
    return {
      id,
      locationName,
      category: { missionName, subTypeName, targetName },
      position: {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      }
    }
  })
  return tagList
}

function useTagList() {
  const {
    data: { unarchivedTagList: { tags = [] } = {} } = {},
    refetch
  } = useQuery(GET_TAG_LIST_QUERY, {})
  const [tagList, setTagList] = useState(null)
  const updateTagList = useCallback(() => {
    setTimeout(async () => {
      refetch()
      updateTagList()
    }, 30000)
  }, [refetch])
  useEffect(() => {
    setTagList(reformatTagList(tags))
  }, [tags])
  return { tags: tagList, refetch, updateTagList }
}

export default useTagList
