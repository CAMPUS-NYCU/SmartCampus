import { gql, useMutation } from '@apollo/client'

export const UPDATE_FIXEDTAG_STATUS_MUTATION = gql`
  mutation updateFixedTagSubLocationStatus(
    $fixedTagSubLocationId: ID!
    $statusName: String!
    $description: String
    $imageUploadNumber: Int
  ) {
    updateFixedTagSubLocationStatus(
      fixedTagSubLocationId: $fixedTagSubLocationId
      statusName: $statusName
      description: $description
      imageUploadNumber: $imageUploadNumber
    ) {
      status {
        statusName
        createTime
        createUser {
          displayName
          uid
          userAddTagNumber
        }
      }
      imageUploadNumber
      imageUploadUrls
    }
  }
`

export const useUpdateFixedTagStatus = () => {
  const [updateFixedTagSubLoacationStatus] = useMutation(
    UPDATE_FIXEDTAG_STATUS_MUTATION
  )
  return { updateFixedTagSubLoacationStatus }
}
