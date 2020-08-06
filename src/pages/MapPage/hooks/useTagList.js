import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

export const GET_TAG_LIST_QUERY = gql`
  query getTagList {
    tagRenderList {
      id
      title
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
  console.log(tagRenderList)
  // Reformat tags
  const filteredTags = tagRenderList.filter((tag) => {
    return tag.coordinates
  })
  console.log(filteredTags)
  const tags = filteredTags.map((tag) => {
    const {
      id,
      title,
      accessibility,
      category: { missionName, subTypeName, targetName },
      coordinates: { latitude, longitude }
    } = tag
    return {
      id,
      title,
      accessibility,
      category: { missionName, subTypeName, targetName },
      position: {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      }
    }
  })
  console.log(tags)
  return { tags }
}

export default useTagList
