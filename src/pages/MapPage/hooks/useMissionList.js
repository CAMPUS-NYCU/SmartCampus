import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

export const GET_MISSION_LIST_QUERY = gql`
  query getMissionList {
    missionList {
      id
      name
      discoveries {
        id
        name
      }
    }
    discoveryList {
      id
      name
      mission {
        id
        name
      }
    }
  }
`

function useMissionList() {
  const { data: { missionList = [], discoveryList = [] } = {} } = useQuery(
    GET_MISSION_LIST_QUERY
  )

  return { missionList, discoveryList }
}

export default useMissionList
