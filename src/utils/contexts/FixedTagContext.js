import React, { useContext, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import useTagSubscription from '../hooks/useTagsSubscription'
import useFixedTagList from '../hooks/useFixedTagList'
import useFixedTagDetail from '../hooks/useFixedTagDetail'
import useUserTags from '../hooks/useUserTags'
import useThreshold from '../hooks/useThreshhold'
import { useDeleteTag } from '../hooks/useDeleteTag'

export const FixedTagContext = React.createContext({
  tags: [],
  activeTag: null,
  activeTagId: null,
  setActiveTagId: () => {},
  resetActiveTag: () => {},
  categoryList: [],
  upVote: () => {},
  userAddTags: null,
  refetchUserAddTags: () => {}
})

function findFixedTagById(id, fixedTags) {
  if (!id || !fixedTags || fixedTags.length === 0) return null
  const targetTag = fixedTags.find((fixedtag) => fixedtag.id === id)
  return targetTag || null
}

export const FixedTagContextProvider = ({ children }) => {
  const { fixedTags, setfixedTagList } = useFixedTagList()
  const { userAddTags, getUserTagList, setUserAddTags } = useUserTags()
  const threshold = useThreshold()
  const { deleteTag, isDeleting } = useDeleteTag()

  const [activeTagId, setActiveTagId] = useState(null)
  const activeFixedTag = findFixedTagById(activeTagId, fixedTags)
  const { fixedtagDetail, getFixedTagDetail } = useFixedTagDetail()
  const newTag = useTagSubscription()
  const resetActiveTag = useCallback(() => {
    setActiveTagId(null)
  }, [setActiveTagId])

  const fetchFixedTagDetail = useCallback(async () => {
    getFixedTagDetail({
      variables: { id: activeTagId }
    })
  }, [getFixedTagDetail, activeTagId])

  useEffect(() => {
    if (newTag.changeType === 'updated') {
      setfixedTagList((prevTagList) => {
        const target = prevTagList.find(
          (fixedtag) => fixedtag.id === newTag.tagContent.id
        )
        return [
          ...prevTagList.filter(
            (fixedtag) => fixedtag.id !== newTag.tagContent.id
          ),
          { ...target, ...newTag.tagContent }
        ]
      })
    }
    if (newTag.changeType === 'added') {
      setfixedTagList((prevTagList) => [...prevTagList, newTag.tagContent])
    }
    if (newTag.changeType === 'archived' || newTag.changeType === 'deleted') {
      setUserAddTags((prevUserAddTags) =>
        prevUserAddTags.filter(
          (fixedtag) => fixedtag.id !== newTag.tagContent.id
        )
      )
      fetchFixedTagDetail((prevTagList) =>
        prevTagList.filter((fixedtag) => fixedtag.id !== newTag.tagContent.id)
      )
    }
  }, [newTag, fetchFixedTagDetail, setfixedTagList, setUserAddTags])

  useEffect(() => {
    if (newTag.changeType === 'updated' && activeTagId) {
      fetchFixedTagDetail()
    }
    if (
      newTag.changeType === 'deleted' &&
      newTag.tagContent.id === activeTagId
    ) {
      resetActiveTag()
    }
  }, [newTag, fetchFixedTagDetail, activeTagId, resetActiveTag])
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
    fixedTags,
    activeTagId,
    activeFixedTag,
    setActiveTagId,
    filterTags,
    addFilterTags,
    resetFilterTags,
    fixedtagDetail,
    userAddTags,
    getUserTagList,
    fetchFixedTagDetail,
    threshold,
    deleteTag,
    isDeleting
  }

  return (
    <FixedTagContext.Provider value={contextValues}>
      {children}
    </FixedTagContext.Provider>
  )
}
FixedTagContextProvider.propTypes = {
  children: PropTypes.any
}
FixedTagContextProvider.defaultProps = {
  children: null
}

export const useFixedTagValue = () => useContext(FixedTagContext)
