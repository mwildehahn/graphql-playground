import {
  TaskDataSource,
  TaskListDataSource,
  TaskListTaskDataSource,
  User,
  UserDataSource,
} from "./schema";

export interface Context {
  dataSources: {
    users: UserDataSource;
    taskLists: TaskListDataSource;
    taskListTasks: TaskListTaskDataSource;
    tasks: TaskDataSource;
  };
  user?: User;
}
