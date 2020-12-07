import { useQuery, gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import initializeSSR from "../apollo/initialize-ssr";
import { User } from "../schema";

interface ViewerQueryData {
  viewer?: User;
}

const VIEWER_QUERY = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
  }
`;

function Index() {
  const { loading, data } = useQuery<ViewerQueryData>(VIEWER_QUERY);
  return (
    <div>
      {loading ? (
        <span>loading...</span>
      ) : (
        <span>Logged in as: {data.viewer?.email}</span>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const client = await initializeSSR();

  await client.query({
    query: VIEWER_QUERY,
  });

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
  };
};

export default Index;
