import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export const GET_TAG_DETAIL_QUERY = gql`
  query getTagDetail($id: ID!) {
    tagDetail(id: $id) {
      tagID
      createTime
      lastUpdateTime
      createUser {
        id
        name
      }
      location {
        geoInfo
      }
      description
      imageUrl
    }
  }
`;

function useTagDetail(id) {
  const {
    data: {
      tagDetail: {
        tagID,
        createTime = null,
        lastUpdateTime = null,
        createUser: {
          id: createUserId = null,
          name: createUserName = '',
        },
        location: {
          geoInfo,
        } = {},
        description = '',
        imageUrl: imageUrl = [],
      },
    } = {},
  } = useQuery(GET_TAG_DETAIL_QUERY, { variables: { id } });

  const tagDetail = {
    id: tagID,
    createTime,
    lastUpdateTime,
    createUserId,
    createUserName,
    geoInfo,
    description,
    imageUrl,
  };

  return { tagDetail };
}

export default useTagDetail;
