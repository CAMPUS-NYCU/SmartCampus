import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import useTagList from '../hooks/useTagList'
import useMissionList from '../hooks/useMissionList'
import useTagDetail from '../hooks/useTagDetail'
import useUserTags from '../hooks/useUserTags'

export const TagContext = React.createContext({
  tags: [],
  activeTag: null,
  activeTagId: null,
  setActiveTagId: () => {},
  resetActiveTag: () => {},
  missionList: [],
  categoryList: [],
  updateTagList: () => {},
  refetch: () => {},
  upVote: () => {},
  userAddTags: null,
  refetchUserAddTags: () => {}
})

export const TagContextProvider = ({ children }) => {
  const { tags, updateTagList, refetch } = useTagList()
  const { userAddTags, refetchUserAddTags } = useUserTags()
  const { missionList } = useMissionList()
  // ! TEMP: 之後會串接 API 拿category列表？
  const categoryList = [
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
  ]

  const [activeTagId, setActiveTagId] = useState(null)
  const activeTag = findTagById(activeTagId, tags)
  const { tagDetail, setTagDetail, refetchTagDetail } = useTagDetail(
    activeTag ? activeTag.id : ''
  )
  const resetActiveTag = () => {
    setActiveTagId(null)
    setTagDetail(null)
  }
  const [filterTags, setFilterTags] = useState([])

  const addFilterTags = (tag) => {
    if (filterTags.indexOf(tag) !== -1) {
      setFilterTags((prevFilterTags) =>
        prevFilterTags.filter((t) => {
          return t !== tag
        })
      )
    } else {
      setFilterTags((prevFilterTags) => [...prevFilterTags, tag])
    }
  }
  const resetFilterTags = (tag) => {
      setFilterTags((prevFilterTags) =>
        prevFilterTags.filter((t) => {
          return t !== tag
        })
      )
  }
  const contextValues = {
    tags,
    activeTag,
    activeTagId,
    setActiveTagId,
    resetActiveTag,
    missionList,
    categoryList,
    updateTagList,
    refetch,
    filterTags,
    addFilterTags,
    resetFilterTags,
    tagDetail,
    userAddTags,
    refetchUserAddTags,
    refetchTagDetail
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

function findTagById(id, tags) {
  if (!id || !tags || tags.length === 0) return null
  const targetTag = tags.find((tag) => tag.id === id)
  return targetTag || null
}
