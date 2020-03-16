import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export const GET_TAG_LIST_QUERY = gql`
  query getTagList {
    tagRenderList {
      id
      title
      accessibility
      coordinates {
        latitude
        longitude
      }
      mission {
        id
        name
        
      }
      discoveries {
        id
        name
      }
    }
  }
`;

function useTagList() {
  const {
    data: {
      tagRenderList: tags = [],
    } = {},
  } = useQuery(GET_TAG_LIST_QUERY);

  return { tags };
}

export default useTagList;
