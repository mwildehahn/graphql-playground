import { graphql, usePaginationFragment } from "react-relay/hooks";
import TaskListRow from "./TaskListRow";
import { TaskLists_user$key } from "./__generated__/TaskLists_user.graphql";

interface PropTypes {
  user: TaskLists_user$key;
}

function TaskLists({ user }: PropTypes) {
  const { data } = usePaginationFragment(
    graphql`
      fragment TaskLists_user on UserGQL
        @argumentDefinitions(
          cursor: { type: "String" }
          count: { type: "Int", defaultValue: 10 }
        )
        @refetchable(queryName: "TaskListPaginationQuery") {
        taskLists(after: $cursor, first: $count)
          @connection(key: "TaskLists_taskLists") {
          edges {
            __id
            node {
              ...TaskListRow
            }
          }
        }
      }
    `,
    user
  );

  const items = data.taskLists.edges.map((edge) => (
    <div key={edge.__id} className="p-6">
      <TaskListRow list={edge.node} />
    </div>
  ));

  return <div>{items}</div>;
}

export default TaskLists;
