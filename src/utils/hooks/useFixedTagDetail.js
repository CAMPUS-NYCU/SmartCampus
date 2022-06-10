import { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import moment from 'moment'

import { useUserValue } from 'utils/contexts/UserContext'

export const GET_FIXEDTAG_DETAIL_QUERY = gql`
  query getFixedTagDetail($id: ID!) {
    fixedTag(fixedTagId: $id) {
      id
      locationName
      coordinates {
        latitude
        longitude
      }
      viewCount
      fixedTagSubLocations {
        __typename
        ... on FixedTagPlace {
          id
          fixedTagId
          type
          floor
          name
          status {
            statusName
            createTime
            createUser {
              displayName
              uid
              userAddTagNumber
            }
            type
          }
          statusHistory {
            statusList {
              statusName
              createTime
              createUser {
                displayName
                uid
                userAddTagNumber
              }
              type
            }
            empty
          }
        }
        ... on FixedTagFloor {
          id
          fixedTagId
          type
          floor
          status {
            statusName
            createTime
            createUser {
              displayName
              uid
              userAddTagNumber
            }
            type
          }
          statusHistory {
            statusList {
              statusName
              createTime
              createUser {
                displayName
                uid
                userAddTagNumber
              }
              type
            }
            empty
          }
        }
      }
    }
  }
`

export const generateTime = (time) => {
  return moment(time).format('YYYY-MM-DD h:mm')
}

const fixedtagDetailInitial = {
  __typename: '',
  id: null,
  locationName: '',
  coordinates: {
    latitude: '',
    longitude: ''
  },
  viewCount: '',
  fixedTagSubLocations: {
    FixedTagPlace: [],
    FixedTagFloor: []
  }
}

function useFixedTagDetail() {
  const { token, uid } = useUserValue()
  const [fixedtagDetail, setFixedTagDetail] = useState(fixedtagDetailInitial)
  const [getFixedTagDetail, { data: { fixedTag = {} } = {} }] = useLazyQuery(
    GET_FIXEDTAG_DETAIL_QUERY,
    {
      fetchPolicy: 'no-cache',
      ...(uid && {
        context: { headers: { authorization: `Bearer ${token}` } }
      })
    }
  )
  useEffect(() => {
    if (fixedTag?.id) {
      setFixedTagDetail({
        ...fixedtagDetailInitial,
        ...fixedTag
      })
    }
  }, [fixedTag])
  return { fixedtagDetail, getFixedTagDetail }
}

export default useFixedTagDetail
