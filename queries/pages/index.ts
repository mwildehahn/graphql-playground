import { graphql } from "react-relay/hooks";

export default graphql`
  query pagesQuery {
    viewer {
      email

      ...TaskLists_user
    }
  }
`;
