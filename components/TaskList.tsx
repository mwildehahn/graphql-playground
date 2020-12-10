import { graphql, useFragment } from "react-relay/hooks";
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

  return <div>{data.title}</div>;
}

export default TaskList;
