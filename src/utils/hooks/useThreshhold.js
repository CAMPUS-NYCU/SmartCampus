import { gql, useQuery } from '@apollo/client'

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
  return archivedThreshold + 1
}

export default useThreshold
