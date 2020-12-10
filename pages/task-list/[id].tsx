import { useRouter } from "next/router";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import TaskListTasks from "../../components/TaskListTasks";
import { IdQuery } from "./__generated__/IdQuery.graphql";

const QUERY = graphql`
  query IdQuery($id: ID!) {
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
  const id = router.query.id as string;

  const data = useLazyLoadQuery<IdQuery>(QUERY, { id });
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
