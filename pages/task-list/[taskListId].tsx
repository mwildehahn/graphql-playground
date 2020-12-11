import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { graphql } from "react-relay";
import { ConnectionHandler } from "relay-runtime";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { v4 } from "uuid";
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
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [commit, isInFlight] = useMutation(graphql`
    mutation TaskListIdMutation($input: CreateTaskData!) {
      createTask(data: $input) {
        taskEdge {
          __id
          cursor
          node {
            id
            title
          }
        }
      }
    }
  `);

  const createTask = useCallback(() => {
    commit({
      variables: {
        input: {
          taskListId: id,
          title: newTaskTitle,
        },
      },
      updater: (store) => {
        const taskListRecord = store.get(id);
        const connectionRecord = ConnectionHandler.getConnection(
          taskListRecord,
          "TaskListTasks_tasks"
        );
        const payload = store.getRootField("createTask");
        const newEdge = payload.getLinkedRecord("taskEdge");
        ConnectionHandler.insertEdgeAfter(connectionRecord, newEdge);
      },
      optimisticUpdater: (store) => {
        const taskListRecord = store.get(id);
        const connectionRecord = ConnectionHandler.getConnection(
          taskListRecord,
          "TaskListTasks_tasks"
        );

        const clientId = `client:new_task:${v4()}`;
        const node = store.create(clientId, "TaskGQL");
        node.setValue(newTaskTitle, "title");
        node.setValue(clientId, "id");

        const newEdge = ConnectionHandler.createEdge(
          store,
          connectionRecord,
          node,
          "TaskGQLEdge"
        );

        ConnectionHandler.insertEdgeAfter(connectionRecord, newEdge);
      },
    });

    setNewTaskTitle("");
  }, [id, newTaskTitle]);

  const data = useLazyLoadQuery<TaskListIdQuery>(QUERY, { id });
  if (!data.node) return <div>List not found: {id}</div>;

  return (
    <div>
      <div>Task List: {data.node.title}</div>
      <div>
        <div>Tasks</div>
        <TaskListTasks list={data.node} />
        <div className="flex">
          <input
            type="text"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            placeholder="Add a task"
          />
          <button onClick={createTask} disabled={isInFlight || !newTaskTitle}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskListPage;
