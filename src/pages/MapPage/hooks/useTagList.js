import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

export const GET_TAG_LIST_QUERY = gql`
  query getTagList {
    tagRenderList {
      id
      title
      accessibility
      coordinates {
        latitude
        longitude
      }
      mission {
        id
        name
      }
      discoveries {
        id
        name
      }
    }
  }
`

function useTagList() {
  const { data: { tagRenderList = [] } = {} } = useQuery(GET_TAG_LIST_QUERY)

  // Reformat tags
  const tags = tagRenderList.map((tag) => {
    const {
      id,
      title,
      accessibility,
      coordinates: { latitude, longitude },
      mission: { id: missionId, name: missionName },
      discoveries = []
    } = tag

    return {
      id,
      title,
      accessibility,
      position: {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      },
      missionId,
      missionName,
      discoveryId: discoveries.length ? discoveries[0].id : null,
      discoveryName: discoveries.length ? discoveries[0].name : null
    }
  })

  return { tags }
}

export default useTagList
