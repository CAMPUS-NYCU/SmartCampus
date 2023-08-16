import React, { useContext, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import useTagSubscription from '../hooks/useTagsSubscription'
import useTagList from '../hooks/useTagList'
import useFixedTagList from '../hooks/useFixedTagList'
import useTagDetail from '../hooks/useTagDetail'
import useFixedTagDetail from '../hooks/useFixedTagDetail'
import useUserTags from '../hooks/useUserTags'
import useThreshold from '../hooks/useThreshhold'
import { useDeleteTag } from '../hooks/useDeleteTag'

export const TagContext = React.createContext({
  tags: [],
  activeTag: null,
  activeTagId: null,
  setActiveTagId: () => {},
  highlightTagId: null,
  setHighLightTagId: () => {},
  resetActiveTag: () => {},
  categoryList: [],
  upVote: () => {},
  userAddTags: null,
  refetchUserAddTags: () => {}
})

function findTagById(id, tags) {
  if (!id || !tags || tags.length === 0) return null
  const targetTag = tags.find((tag) => tag.id === id)
  return targetTag || null
}
function findFixedTagById(id, fixedTags) {
  if (!id || !fixedTags || fixedTags.length === 0) return null
  const targetTag = fixedTags.find((fixedtag) => fixedtag.id === id)
  return targetTag || null
}

export const TagContextProvider = ({ children }) => {
  const { tags, setTagList } = useTagList()
  const { fixedTags } = useFixedTagList()
  const { userAddTags, getUserTagList, setUserAddTags } = useUserTags()
  const threshold = useThreshold()
  const { deleteTag, isDeleting } = useDeleteTag()

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
  const [highlightTagId, setHighLightTagId] = useState(null)
  const activeTag = findTagById(activeTagId, tags)
  const activeFixedTag = findFixedTagById(activeTagId, fixedTags)
  const { tagDetail, getTagDetail, resetTagDetail } = useTagDetail()
  const { fixedtagDetail, getFixedTagDetail } = useFixedTagDetail()
  const newTag = useTagSubscription()
  const resetActiveTag = useCallback(() => {
    setActiveTagId(null)
    resetTagDetail()
  }, [setActiveTagId, resetTagDetail])
  const fetchTagDetail = useCallback(async () => {
    getTagDetail({
      variables: { id: activeTagId }
    })
  }, [getTagDetail, activeTagId])
  const fetchFixedTagDetail = useCallback(async () => {
    getFixedTagDetail({
      variables: { id: activeTagId }
    })
  }, [getFixedTagDetail, activeTagId])
  useEffect(() => {
    if (newTag.changeType === 'updated') {
      setTagList((prevTagList) => {
        const target = prevTagList.find(
          (tag) => tag.id === newTag.tagContent.id
        )
        return [
          ...prevTagList.filter((tag) => tag.id !== newTag.tagContent.id),
          { ...target, ...newTag.tagContent }
        ]
      })
    }
    if (newTag.changeType === 'added') {
      setTagList((prevTagList) => [...prevTagList, newTag.tagContent])
    }
    if (newTag.changeType === 'archived' || newTag.changeType === 'deleted') {
      setUserAddTags((prevUserAddTags) =>
        prevUserAddTags.filter((tag) => tag.id !== newTag.tagContent.id)
      )
      setTagList((prevTagList) =>
        prevTagList.filter((tag) => tag.id !== newTag.tagContent.id)
      )
    }
  }, [newTag, setTagList, setUserAddTags])
  useEffect(() => {
    if (newTag.changeType === 'updated' && activeTagId) {
      fetchTagDetail()
    }
    if (
      newTag.changeType === 'deleted' &&
      newTag.tagContent.id === activeTagId
    ) {
      resetActiveTag()
    }
  }, [newTag, fetchTagDetail, activeTagId, resetTagDetail, resetActiveTag])
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
    fixedTags,
    activeTag,
    activeTagId,
    activeFixedTag,
    setActiveTagId,
    highlightTagId,
    setHighLightTagId,
    resetActiveTag,
    categoryList,
    filterTags,
    addFilterTags,
    resetFilterTags,
    tagDetail,
    fixedtagDetail,
    userAddTags,
    getUserTagList,
    fetchTagDetail,
    fetchFixedTagDetail,
    threshold,
    deleteTag,
    isDeleting
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
