import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

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
    }
  }
`

function useTagList() {
  const { data: { tagRenderList = [] } = {} } = useQuery(GET_TAG_LIST_QUERY)
  // Reformat tags
  const filteredTags = tagRenderList.filter((tag) => {
    return tag.coordinates
  })
  const tags = filteredTags.map((tag) => {
    const {
      id,
      locationName,
      accessibility,
      category: { missionName, subTypeName, targetName },
      coordinates: { latitude, longitude }
    } = tag
    return {
      id,
      locationName,
      accessibility,
      category: { missionName, subTypeName, targetName },
      position: {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      }
    }
  })
  return { tags }
}

export default useTagList
