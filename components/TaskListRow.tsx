import { graphql, useFragment } from "react-relay/hooks";
import Link from "next/link";
import { TaskListRow$key } from "./__generated__/TaskListRow.graphql";

interface PropTypes {
  list: TaskList$key;
}

function TaskList({ list }: PropTypes) {
  const data = useFragment(
    graphql`
      fragment TaskListRow on TaskListGQL {
        id
        title
      }
    `,
    list
  );

  return (
    <Link href={`/task-list/${data.id}`} prefetch>
      <a>{data.title}</a>
    </Link>
  );
}

export default TaskList;
