import { IncomingMessage, ServerResponse } from "http";

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
  req: IncomingMessage;
  res: ServerResponse;
}

export interface Session {
  userId: string;
  createdAt: number;
  maxAge: number;
}
