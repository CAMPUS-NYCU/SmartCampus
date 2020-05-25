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
      tagDetail{
        tagID
        createTime
        lastUpdateTime
        description
        imageUrl
      }
    }
  }
`
const generateTime = (time) => { 
  var times = time.split(" ")
  var month = 0
  switch (times[1]) {
    case 'Jan':
      month = 1
    case 'Feb':
      month = 2
    case 'Mar':
      month = 3
    case 'Apr':
      month = 4
    case 'May':
      month = 5
    case 'Jun':
      month = 6
    case 'Jul':
      month = 7
    case 'Aug':
      month = 8
    case 'Sep':
      month = 9
    case 'Oct':
      month = 10
    case 'Nov':
      month = 11
    case 'Dec':
      month = 12
    default:
      month = 0
  }
  return `${times[3]}-${month}-${times[2]} ${times[4]}`
}

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
      discoveries = [],
      tagDetail:{createTime,lastUpdateTime,description,imageUrl}
    } = tag
    const createTimeNew=generateTime(createTime)
    const lastUpdateTimeNew=generateTime(lastUpdateTime)
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
      discoveryName: discoveries.length ? discoveries[0].name : null,
      detail:{
        createTimeNew,
        lastUpdateTimeNew,
        description,
        imageUrl
      }
      
    }
  })

  return { tags }
}

export default useTagList