import { graphql, useFragment } from "react-relay/hooks";
import Link from "next/link";
import { TaskList$key } from "./__generated__/TaskList.graphql";

interface PropTypes {
  list: TaskList$key;
}

function TaskList({ list }: PropTypes) {
  const data = useFragment(
    graphql`
      fragment TaskList on TaskListGQL {
        id
        title
      }
    `,
    list
  );

  return (
    <Link href={`/task-list/${data.id}`}>
      <a>{data.title}</a>
    </Link>
  );
}

export default TaskList;
