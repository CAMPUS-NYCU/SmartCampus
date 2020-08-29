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

function useTagList() {
  // console.log("tag list")
  // const [getTagList] = useQuery(GET_TAG_LIST_QUERY)
  // getTagList().then((res) => console.log('res', res))
  const { data: { tagRenderList = [] } = {}, refetch } = useQuery(
    GET_TAG_LIST_QUERY
  )
  // Reformat tags

  const [tags, setTags] = useState(tagRenderList)
  // if (tags != tagList) {
  //   setTags(tagList)
  // }
  useEffect(() => {
    if (tagRenderList) {
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
      setTags(tagList)
    }
  }, [tagRenderList])
  return { tags, refetch }
}

export default useTagList
