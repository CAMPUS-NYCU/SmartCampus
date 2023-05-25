import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useUserValue } from '../contexts/UserContext'

export const DELETE_TAG_MUTATION = gql`
  mutation deleteTag($tagId: ID!) {
    deleteTagDataByCreateUser(tagId: $tagId)
  }
`
export const useDeleteTag = () => {
  const [deleteTagMutation] = useMutation(DELETE_TAG_MUTATION)
  const { token } = useUserValue()
  const [isDeleting, setIsDeleting] = useState(false)
  const deleteTag = async (id) => {
    setIsDeleting(true)
    if (token) {
      try {
        await deleteTagMutation({
          context: {
            headers: {
              authorization: token ? `Bearer ${token}` : ''
            }
          },
          variables: {
            tagId: id
          }
        })
      } catch (err) {
        console.error(err)
      } finally {
        setIsDeleting(false)
      }
    }
  }
  return { deleteTag, isDeleting }
}
