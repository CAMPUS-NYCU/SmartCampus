import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import useTagList from '../hooks/useTagList';

export const TagContext = React.createContext({
  tags: [],
});

export const TagContextProvider = ({ children }) => {
  const { tags } = useTagList();

  const contextValues = {
    tags,
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
