import { useCallback } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useUserValue } from '../contexts/UserContext'

export const INCREMENT_VIEW_COUNT_MUTATION = gql`
  mutation incrementViewCount($tagId: ID!) {
    incrementViewCount(tagId: $tagId)
  }
`

export const useViewCount = () => {
  const [incrementViewCountMutation] = useMutation(
    INCREMENT_VIEW_COUNT_MUTATION
  )
  const { token } = useUserValue()
  const incrementViewCount = useCallback(
    async (id) => {
      try {
        incrementViewCountMutation({
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
      }
    },
    [incrementViewCountMutation, token]
  )
  return { incrementViewCount }
}
