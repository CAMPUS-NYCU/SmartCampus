import { gql, useMutation } from '@apollo/client'
import * as firebase from 'firebase/app'

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
  function upVote(id, voteAction) {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        upVoteMutation({
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
      })
  }
  return { upVote }
}
