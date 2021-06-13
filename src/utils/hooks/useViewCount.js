import { useCallback } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import * as firebase from 'firebase/app'

export const INCREMENT_VIEW_COUNT_MUTATION = gql`
  mutation incrementViewCount($tagId: ID!) {
    incrementViewCount(tagId: $tagId)
  }
`

export const useViewCount = () => {
  const [incrementViewCountMutation] = useMutation(
    INCREMENT_VIEW_COUNT_MUTATION
  )
  const incrementViewCount = useCallback(
    async (id) => {
      try {
        const token = await firebase.auth().currentUser.getIdToken()
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
    [incrementViewCountMutation]
  )
  return { incrementViewCount }
}
