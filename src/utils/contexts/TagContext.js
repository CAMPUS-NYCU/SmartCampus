import React, { useContext, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

import useTagList from '../hooks/useTagList'
import useTagDetail from '../hooks/useTagDetail'
import useUserTags from '../hooks/useUserTags'
import useThreshold from '../hooks/useThreshhold'

export const TagContext = React.createContext({
  tags: [],
  activeTag: null,
  activeTagId: null,
  setActiveTagId: () => {},
  resetActiveTag: () => {},
  categoryList: [],
  refetch: () => {},
  upVote: () => {},
  userAddTags: null,
  refetchUserAddTags: () => {},
  updateTagList: () => {}
})

function findTagById(id, tags) {
  if (!id || !tags || tags.length === 0) return null
  const targetTag = tags.find((tag) => tag.id === id)
  return targetTag || null
}

export const TagContextProvider = ({ children }) => {
  const { tags, refetch, updateTagList } = useTagList()
  const { userAddTags, refetchUserAddTags } = useUserTags()
  const threshold = useThreshold()
  // ! TEMP: 之後會串接 API 拿category列表？
  const categoryList = useMemo(
    () => [
      {
        id: 1,
        name: '校園設施'
      },
      {
        id: 2,
        name: '校園問題'
      },
      {
        id: 3,
        name: '校園狀態'
      }
    ],
    []
  )
  const [activeTagId, setActiveTagId] = useState(null)
  const activeTag = useMemo(() => findTagById(activeTagId, tags), [
    activeTagId,
    tags
  ])
  const { tagDetail, getTagDetail } = useTagDetail()
  const resetActiveTag = useCallback(() => {
    setActiveTagId(null)
  }, [])
  const fetchTagDetail = useCallback(async () => {
    getTagDetail({
      variables: { id: activeTagId }
    })
  }, [getTagDetail, activeTagId])
  const [filterTags, setFilterTags] = useState([])
  const addFilterTags = useCallback(
    (tag) => {
      if (filterTags.indexOf(tag) !== -1) {
        setFilterTags((prevFilterTags) =>
          prevFilterTags.filter((t) => {
            return t !== tag
          })
        )
      } else {
        setFilterTags((prevFilterTags) => [...prevFilterTags, tag])
      }
    },
    [filterTags]
  )
  const resetFilterTags = useCallback((tag) => {
    setFilterTags((prevFilterTags) =>
      prevFilterTags.filter((t) => {
        return t !== tag
      })
    )
  }, [])
  const contextValues = {
    tags,
    activeTag,
    activeTagId,
    setActiveTagId,
    resetActiveTag,
    categoryList,
    refetch,
    filterTags,
    addFilterTags,
    resetFilterTags,
    tagDetail,
    userAddTags,
    refetchUserAddTags,
    fetchTagDetail,
    threshold,
    updateTagList
  }

  return (
    <TagContext.Provider value={contextValues}>{children}</TagContext.Provider>
  )
}
TagContextProvider.propTypes = {
  children: PropTypes.any
}
TagContextProvider.defaultProps = {
  children: null
}

export const useTagValue = () => useContext(TagContext)
