import { ApolloServer } from "apollo-server-micro";
import { InMemoryLRUCache } from "apollo-server-caching";
import { Request } from "express";
import isEmail from "isemail";

import schema, {
  TaskListDataSource,
  UserDataSource,
  TaskListTaskDataSource,
  TaskDataSource,
} from "../../schema";

/**
 * Initialize data sources
 */
const dataSources = () => {
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
};

/**
 * Setup global context
 */
const context = async ({ req }: { req: Request }) => {
  // simple auth check on every request
  const auth = (req.headers && req.headers.authorization) || "";
  const email = Buffer.from(auth, "base64").toString("ascii");

  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) {
    return { user: null };
  }

  // find a user by their email
  const user = await dataSources().users.fetchOrCreate(email);

  return { user };
};

const server = new ApolloServer({
  schema,
  dataSources,
  context,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: "/api/graphql" });
