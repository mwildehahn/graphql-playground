import { useRouter } from "next/router";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import TaskListTasks from "../../components/TaskListTasks";
import { TaskListIdQuery } from "./__generated__/TaskListIdQuery.graphql";

const QUERY = graphql`
  query TaskListIdQuery($id: ID!) {
    node(id: $id) {
      ... on TaskListGQL {
        title
        ...TaskListTasks__task_list
      }
    }
  }
`;

function TaskListPage() {
  const router = useRouter();
  const id = router.query.taskListId as string;

  const data = useLazyLoadQuery<TaskListIdQuery>(QUERY, { id });
  if (!data.node) return <div>List not found: {id}</div>;

  return (
    <div>
      <div>Task List: {data.node.title}</div>
      <div>
        <div>Tasks</div>
        <TaskListTasks list={data.node} />
      </div>
    </div>
  );
}

export default TaskListPage;
