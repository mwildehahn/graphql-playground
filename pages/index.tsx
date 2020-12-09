import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import TaskLists from "../components/TaskLists";
import { pagesQuery } from "./__generated__/pagesQuery.graphql";

function Index() {
  const data = useLazyLoadQuery<pagesQuery>(
    graphql`
      query pagesQuery {
        viewer {
          email

          ...TaskLists_user
        }
      }
    `,
    {}
  );

  return (
    <div>
      {data.viewer ? (
        <div className="container">
          <div className="flex justify-end w-full">
            <span>Logged in as: {data.viewer.email}</span>
          </div>
          <div className="flex justify-center">
            <TaskLists user={data.viewer} />
          </div>
        </div>
      ) : (
        <span>Login</span>
      )}
    </div>
  );
}

export default Index;
