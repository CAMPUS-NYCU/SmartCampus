import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import useTagList from '../hooks/useTagList';

export const TagContext = React.createContext({
  tags: [],
  activeTag: null,
  activeTagId: null,
  setActiveTagId: () => {},
  resetActiveTag: () => {},
});

export const TagContextProvider = ({ children }) => {
  const { tags } = useTagList();

  const [activeTagId, setActiveTagId] = useState(null);
  const resetActiveTag = () => setActiveTagId(null);
  const activeTag = findTagById(activeTagId, tags);

  const contextValues = {
    tags,
    activeTag,
    activeTagId,
    setActiveTagId,
    resetActiveTag,
  };

  return (
    <TagContext.Provider value={contextValues}>
      {children}
    </TagContext.Provider>
  );
};
TagContextProvider.propTypes = {
  children: PropTypes.any,
};
TagContextProvider.defaultProps = {
  children: null,
};

export const useTagValue = () => useContext(TagContext);

function findTagById(id, tags) {
  if (!id || !tags || tags.length === 0) return null;
  const targetTag = tags.find((tag) => tag.id === id);
  return targetTag || null;
}
