import { graphql, usePaginationFragment } from "react-relay/hooks";
import TaskRow from "./TaskRow";
import { TaskListTasks__task_list$key } from "./__generated__/TaskListTasks__task_list.graphql";

interface PropTypes {
  list: TaskListTasks__task_list$key;
}

export default function TaskListTasks({ list }: PropTypes) {
  const { data } = usePaginationFragment(
    graphql`
      fragment TaskListTasks__task_list on TaskListGQL
        @argumentDefinitions(
          cursor: { type: "String" }
          count: { type: "Int", defaultValue: 10 }
        )
        @refetchable(queryName: "TaskListTasksPaginationQuery") {
        tasks(after: $cursor, first: $count)
          @connection(key: "TaskListTasks_tasks") {
          edges {
            __id
            node {
              ...TaskRow_task
            }
          }
        }
      }
    `,
    list
  );

  const items = data.tasks.edges.map((edge) => (
    <div key={edge.__id} className="p-6">
      <TaskRow task={edge.node} />
    </div>
  ));

  return <div>{items}</div>;
}
