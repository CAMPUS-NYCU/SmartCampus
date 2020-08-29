import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useState, useEffect } from 'react'

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
    }
  }
`

const reformatTagList = (data) => {
  console.log('reformate', data)
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
    return {
      id,
      locationName,
      accessibility,
      category: { missionName, subTypeName, targetName },
      position: {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      },
      status: { statusName }
    }
  })
  return tagList
}

function useTagList() {
  // console.log("tag list")
  // const [getTagList] = useQuery(GET_TAG_LIST_QUERY)
  // getTagList().then((res) => console.log('res', res))
  const { data, refetch } = useQuery(GET_TAG_LIST_QUERY, {
    onCompleted: () => {
      setTags(tagList)
    }
  })
  // Reformat tags
  const tagList = reformatTagList(data)
  const [tags, setTags] = useState(tagList)
  const updateTagList = (data) => {
    setTags(reformatTagList(data))
  }

  return { tags, refetch, updateTagList }
}

export default useTagList
