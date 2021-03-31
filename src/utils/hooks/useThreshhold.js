import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_THRESHOLD = gql`
  query {
    archivedThreshold
  }
`

const useThreshold = () => {
  const { data: { archivedThreshold = null } = {} } = useQuery(GET_THRESHOLD, {
    onCompleted: () => {
      return archivedThreshold
    }
  })
  return archivedThreshold
}

export default useThreshold
