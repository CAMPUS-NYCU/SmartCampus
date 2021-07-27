import { useMemo } from 'react'
import { gql, useQuery } from '@apollo/client'

export const GET_USER_DETAIL_QUERY = gql`
  query getUserDetail($uid: ID!) {
    getUserData(uid: $uid) {
      uid
      displayName
      photoURL
      email
      userAddTagNumber
    }
  }
`

const userDetailInitial = {
  uid: null,
  displayName: '',
  photoURL: '',
  email: '',
  userAddTagNumber: 0
}

function useUserDetail(props) {
  const { userId } = props
  const { data: { getUserData = {} } = {} } = useQuery(GET_USER_DETAIL_QUERY, {
    fetchPolicy: 'no-cache',
    variables: { uid: userId }
  })
  const userDetail = useMemo(
    () => ({
      ...userDetailInitial,
      ...getUserData
    }),
    [getUserData]
  )
  return { userDetail }
}

export default useUserDetail
