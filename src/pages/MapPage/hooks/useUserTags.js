import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useState } from 'react'
import * as firebase from 'firebase/app'
import { generateTime } from './useTagDetail'

const GET_USER_TAGS_QUERY = gql`
  query getUserTags {
    userAddTagHistory {
      id
      locationName
      category {
        missionName
        subTypeName
        targetName
      }
      accessibility
      coordinates {
        latitude
        longitude
      }
      status {
        statusName
      }
      statusHistory {
        statusName
        createTime
      }
    }
  }
`

const useUserTags = () => {
  const userID = firebase.auth().currentUser
    ? firebase.auth().currentUser.uid
    : ''
  const [token, setToken] = useState('')
  if (firebase.auth().currentUser) {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((t) => {
        setToken(t)
      })
  }
  console.log('uid', userID)
  console.log('token', token)
  const { data, error } = useQuery(GET_USER_TAGS_QUERY, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    },
    variables: {
      userID
    },
    onCompleted: () => {
      console.log('data')
    }
  })
  console.log('error', error)
  console.log('data', data)
  return { data }
}

export default useUserTags
