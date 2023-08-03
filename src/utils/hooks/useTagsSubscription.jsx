import { useSubscription, gql } from '@apollo/client'

export const TAG_CHANGE_SUBSCRIPTION = gql`
  subscription onTagChange {
    tagChangeSubscription {
      changeType
      tagContent {
        id
        locationName
        coordinates {
          latitude
          longitude
        }
        category {
          categoryType
          categoryName
          categoryDescName
          locationImgUrl
        }
        floor
        status {
          statusName
          statusDescName
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
