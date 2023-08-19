import { useSubscription, gql } from '@apollo/client'

export const TAG_CHANGE_SUBSCRIPTION = gql`
  subscription onTagChange {
    tagResearchChangeSubscription {
      changeType
      tagContent {
        id
        fixedTagId
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
  return !loading && data.tagResearchChangeSubscription
}

export default useTagSubscription
