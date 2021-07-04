import { useCallback, useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

export const GET_TAG_LIST_QUERY = gql`
  query getTagList {
    unarchivedTagList {
      tags {
        id
        category {
          missionName
          subTypeName
          targetName
        }
        coordinates {
          latitude
          longitude
        }
      }
    }
  }
`

function useTagList() {
  const {
    data: { unarchivedTagList: { tags = [] } = {} } = {},
    refetch
  } = useQuery(GET_TAG_LIST_QUERY, {})
  const [tagList, setTagList] = useState(null)
  const updateTagList = useCallback(() => {
    setTimeout(async () => {
      refetch()
      updateTagList()
    }, 30000)
  }, [refetch])
  useEffect(() => {
    setTagList(tags)
  }, [tags])
  return { tags: tagList, refetch, updateTagList }
}

export default useTagList
