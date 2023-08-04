import { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

import { useUserValue } from '../contexts/UserContext'

export const GET_FIXEDTAG_DETAIL_QUERY = gql`
  query getFixedTagDetail($id: ID!) {
    fixedTagResearch(fixedTagId: $id) {
      id
      locationName
      coordinates {
        latitude
        longitude
      }
      tags {
        id
        fixedTagId
        locationName
      }
    }
  }
`

const fixedtagDetailInitial = {
  id: null,
  locationName: '',
  coordinates: {
    latitude: '',
    longitude: ''
  },
  tags: []
}

function useFixedTagDetail() {
  const { token, uid } = useUserValue()
  const [fixedtagDetail, setFixedTagDetail] = useState(fixedtagDetailInitial)
  const [getFixedTagDetail, { data: { fixedTagResearch = {} } = {} }] =
    useLazyQuery(GET_FIXEDTAG_DETAIL_QUERY, {
      fetchPolicy: 'no-cache',
      ...(uid && {
        context: { headers: { authorization: `Bearer ${token}` } }
      })
    })
  useEffect(() => {
    if (fixedTagResearch?.id) {
      setFixedTagDetail({
        ...fixedtagDetailInitial,
        ...fixedTagResearch
      })
    }
  }, [fixedTagResearch])
  return { fixedtagDetail, getFixedTagDetail }
}

export default useFixedTagDetail
