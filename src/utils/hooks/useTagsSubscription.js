import { useSubscription, gql } from '@apollo/client'

export const TAG_CHANGE_SUBSCRIPTION = gql`
  subscription onTagChange {
    tagChangeSubscription {
      changeType
      tagContent {
        id
        category {
          missionName
          subTypeName
          targetName
        }
        coordinates {
          latitude
          longitude
        }
        lastUpdateTime
        status {
          statusName
          numberOfUpVote
        }
      }
    }
  }
`

const useTagSubscription = () => {
  const { data, loading } = useSubscription(TAG_CHANGE_SUBSCRIPTION)
  return !loading && data.tagChangeSubscription
}

export default useTagSubscription
