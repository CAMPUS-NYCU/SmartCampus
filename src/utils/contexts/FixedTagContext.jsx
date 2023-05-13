import React, { useContext, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

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
  const { fixedTags } = useFixedTagList()
  const { userAddTags, getUserTagList } = useUserTags()
  const threshold = useThreshold()
  const { deleteTag, isDeleting } = useDeleteTag()

  const [activeTagId, setActiveTagId] = useState(null)
  const activeFixedTag = findFixedTagById(activeTagId, fixedTags)
  const { fixedtagDetail, getFixedTagDetail } = useFixedTagDetail()
  const fetchFixedTagDetail = useCallback(async () => {
    getFixedTagDetail({
      variables: { id: activeTagId }
    })
  }, [getFixedTagDetail, activeTagId])

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
