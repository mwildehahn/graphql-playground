import { useQuery, gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import initializeSSR from "../apollo/initialize-ssr";
import TaskLists from "../components/TaskLists";

interface ViewerQueryData {
  viewer?: {
    email: string;
  };
}

const VIEWER_QUERY = gql`
  query {
    viewer {
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
        <div className="container">
          <div className="flex justify-end w-full">
            <span>Logged in as: {data.viewer?.email}</span>
          </div>
          <div className="flex justify-center">
            <TaskLists />
          </div>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const client = await initializeSSR({ req, res });

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
