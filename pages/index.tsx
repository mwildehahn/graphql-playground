import { useLazyLoadQuery, graphql } from "react-relay/hooks";
import TaskLists from "../components/TaskLists";
import { pagesQuery } from "./__generated__/pagesQuery.graphql";

const QUERY = graphql`
  query PagesQuery {
    viewer {
      email

      ...TaskLists_user
    }
  }
`;

function Index() {
  const data = useLazyLoadQuery<pagesQuery>(QUERY, {});

  return (
    <div className="container flex flex-col justify-center">
      {data.viewer ? (
        <>
          <div className="flex justify-end w-full">
            <span>Logged in as: {data.viewer.email}</span>
          </div>
          <div className="flex justify-center">
            <TaskLists user={data.viewer} />
          </div>
        </>
      ) : (
        <div className="flex w-full justify-center">
          <span>Login required</span>
        </div>
      )}
    </div>
  );
}

// TODO: support server side props. Need to setup an environment that just
// executes the GraphQL since we're already running the server
// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   // TODO init environment with req cookies
//   const environment = initEnvironment();
//   const queryProps = await fetchQuery<pagesQuery>(
//     environment,
//     query,
//     {}
//   ).toPromise();

//   const initialRecords = environment
//     .getStore()
//     .getSource()
//     .toJSON();
//   console.log("Initial Records", initialRecords);

//   return {
//     props: {
//       ...queryProps,
//       initialRecords,
//     },
//   };
// };

export default Index;
