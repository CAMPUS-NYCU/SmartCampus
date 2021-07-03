import { useSubscription } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

export const TAG_CHANGE_SUBSCRIPTION = gql`
  subscription onTagChange {
    tagChangeSubscription {
      changeType
      tagContent {
        id
      }
    }
  }
`

const useTagSubscription = () => {
  const data = useSubscription(TAG_CHANGE_SUBSCRIPTION)
  return data
}

export default useTagSubscription

// TODO
