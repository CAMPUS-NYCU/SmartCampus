import { gql, useMutation } from '@apollo/client'
import { useUserValue } from '../contexts/UserContext'

export const UP_VOTE_MUTATION = gql`
  mutation updateUpVoteStatus($tagId: ID!, $action: updateUpVoteAction!) {
    updateUpVoteStatus(tagId: $tagId, action: $action) {
      numberOfUpVote
      hasUpVote
    }
  }
`
export const useUpdateVote = () => {
  const [upVoteMutation] = useMutation(UP_VOTE_MUTATION)
  const { token } = useUserValue()
  async function upVote(id, voteAction) {
    if (token) {
      try {
        await upVoteMutation({
          context: {
            headers: {
              authorization: token ? `Bearer ${token}` : ''
            }
          },
          variables: {
            tagId: id,
            action: voteAction ? 'UPVOTE' : 'CANCEL_UPVOTE'
          }
        })
      } catch (err) {
        console.error(err)
      }
    }
  }
  return { upVote }
}
