import { gql, useMutation } from '@apollo/client'

export const UPDATE_TAG_STATUS_MUTATION = gql`
  mutation updateTagData($tagId: ID!, $data: updateTagResearchDataInput!) {
    updateTagResearchData(tagId: $tagId, data: $data) {
      tagResearch {
        id
        locationName
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
      imageUploadNumber
      imageUploadUrls
      imageDeleteStatus
    }
  }
`

export const useUpdateTagStatus = () => {
  const [updateStatus] = useMutation(UPDATE_TAG_STATUS_MUTATION)
  return { updateStatus }
}
