import { graphql, useFragment } from "react-relay/hooks";
import { TaskLists_user$key } from "./__generated__/TaskLists_user.graphql";

interface PropTypes {
  user: TaskLists_user$key;
}

function TaskLists(props: PropTypes) {
  const data = useFragment(
    graphql`
      fragment TaskLists_user on UserGQL {
        taskLists(first: 10) {
          nodes {
            id
            title
          }
        }
      }
    `,
    props.user
  );

  const items = data.taskLists.nodes.map((list) => (
    <div key={list.id} className="p-6">
      {list.title}
    </div>
  ));

  return <div>{items}</div>;
}

export default TaskLists;
