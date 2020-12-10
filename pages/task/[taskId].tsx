import { useRouter } from "next/router";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import TaskListTasks from "../../components/TaskListTasks";
import { TaskIdQuery } from "./__generated__/TaskIdQuery.graphql";

const QUERY = graphql`
  query TaskIdQuery($id: ID!) {
    node(id: $id) {
      ... on TaskGQL {
        title
      }
    }
  }
`;

function TaskListPage() {
  const router = useRouter();
  const id = router.query.taskId as string;

  const data = useLazyLoadQuery<TaskIdQuery>(QUERY, { id });
  if (!data.node) return <div>Task not found: {id}</div>;

  return (
    <div>
      <div>{data.node.title}</div>
    </div>
  );
}

export default TaskListPage;
