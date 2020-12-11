import { graphql, useFragment } from "react-relay/hooks";
import Link from "next/link";
import { TaskRow_task$key } from "./__generated__/TaskRow_task.graphql";

interface PropTypes {
  task: TaskRow_task$key;
}

export default function TaskRow({ task }: PropTypes) {
  const data = useFragment(
    graphql`
      fragment TaskRow_task on TaskGQL {
        id
        title
      }
    `,
    task
  );

  return (
    <Link href={`/task/${data.id}`} prefetch>
      {data.title}
    </Link>
  );
}
