import { useSubscription, gql } from '@apollo/client'

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
  const data = useSubscription(TAG_CHANGE_SUBSCRIPTION, {
    onSubscriptionData: (t) => console.log(t)
  })
  return data
}

export default useTagSubscription

// TODO
