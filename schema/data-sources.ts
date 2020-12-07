import { InMemoryLRUCache } from "apollo-server-caching";

import {
  TaskListDataSource,
  UserDataSource,
  TaskListTaskDataSource,
  TaskDataSource,
} from ".";

export default function dataSources() {
  const userDataSource = new UserDataSource();
  userDataSource.initialize({ context: {}, cache: new InMemoryLRUCache() });

  const taskListDataSource = new TaskListDataSource();
  taskListDataSource.initialize({ context: {}, cache: new InMemoryLRUCache() });

  const taskDataSource = new TaskDataSource();
  taskDataSource.initialize({ context: {}, cache: new InMemoryLRUCache() });

  const taskListTaskDataSource = new TaskListTaskDataSource();
  taskListTaskDataSource.initialize({
    context: {},
    cache: new InMemoryLRUCache(),
  });

  return {
    users: userDataSource,
    tasks: taskDataSource,
    taskLists: taskListDataSource,
    taskListTasks: taskListTaskDataSource,
  };
}
