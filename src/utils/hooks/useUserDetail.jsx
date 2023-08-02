import { useMemo } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

export const GET_USER_DETAIL_QUERY = gql`
  query getUserDetail($uid: ID!) {
    getUserResearchData(uid: $uid) {
      uid
      displayName
      photoURL
      email
    }
  }
`

const userDetailInitial = {
  uid: null,
  displayName: '',
  photoURL: '',
  email: ''
}

function useUserDetail() {
  const [getUserDetail, { data: { getUserResearchData = {} } = {}, loading }] =
    useLazyQuery(GET_USER_DETAIL_QUERY, {
      fetchPolicy: 'no-cache'
    })
  const userDetail = useMemo(
    () => ({
      ...userDetailInitial,
      ...getUserResearchData
    }),
    [getUserResearchData]
  )
  return { userDetail, getUserDetail, loading }
}

export default useUserDetail
