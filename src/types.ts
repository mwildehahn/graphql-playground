import { TaskListDataSource, User, UserDataSource } from "./schema";

export interface Context {
  dataSources: {
    users: UserDataSource;
    taskLists: TaskListDataSource;
  };
  user?: User;
}
