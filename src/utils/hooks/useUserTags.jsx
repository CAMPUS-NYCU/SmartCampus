import { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

const GET_USER_TAGS_QUERY = gql`
  query getUserTags($uid: ID!) {
    userAddTagResearchHistory(uid: $uid) {
      tags {
        id
        createUser {
          uid
        }
        imageUrl
      }
      cursor
      empty
    }
  }
`

const useUserTags = () => {
  const [userAddTags, setUserAddTags] = useState(null)
  const [
    getUserTagList,
    { data: { userAddTagResearchHistory: { tags = null } = {} } = {} }
  ] = useLazyQuery(GET_USER_TAGS_QUERY, {
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      setUserAddTags(tags)
    }
  })

  return { userAddTags, setUserAddTags, getUserTagList }
}

export default useUserTags
