import { useMemo } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

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

function useUserDetail() {
  const [
    getUserDetail,
    { data: { getUserData = {} } = {}, loading }
  ] = useLazyQuery(GET_USER_DETAIL_QUERY, {
    fetchPolicy: 'no-cache'
  })
  const userDetail = useMemo(
    () => ({
      ...userDetailInitial,
      ...getUserData
    }),
    [getUserData]
  )
  return { userDetail, getUserDetail, loading }
}

export default useUserDetail
