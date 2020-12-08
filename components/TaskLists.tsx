import { useQuery, gql } from "@apollo/client";

interface TaskListsQueryData {
  viewer: {
    taskLists: {
      nodes: {
        id: string;
        title: string;
      }[];
    };
  };
}

const TASK_LISTS_QUERY = gql`
  query {
    viewer {
      taskLists(first: 10) {
        nodes {
          id
          title
        }
      }
    }
  }
`;

function TaskLists() {
  const { loading, data } = useQuery<TaskListsQueryData>(TASK_LISTS_QUERY);
  if (loading) return null;

  const items = data.viewer.taskLists.nodes.map((list) => (
    <div key={list.id} className="p-6">
      {list.title}
    </div>
  ));

  return <div>{items}</div>;
}

export default TaskLists;
