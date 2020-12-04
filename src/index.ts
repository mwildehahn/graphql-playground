import dotenv from "dotenv";
import { makeSchema } from "@nexus/schema";
import { ApolloServer } from "apollo-server";
import { InMemoryLRUCache } from "apollo-server-caching";
import { Request } from "express";
import isEmail from "isemail";
import path from "path";
import * as types from "./schema";
import { TaskListDataSource, UserDataSource } from "./schema";

dotenv.config();

const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(__dirname, "../api.graphql"),
    typegen: path.join(
      __dirname.replace(/\/dist$/, "/src"),
      "../src/api-typegen.ts"
    ),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname.replace(/\/dist$/, "/src"), "./types.ts"),
        alias: "t",
      },
    ],
    contextType: "t.Context",
  },
});

/**
 * Initialize data sources
 */
const dataSources = () => {
  const userDataSource = new UserDataSource();
  userDataSource.initialize({ context: {}, cache: new InMemoryLRUCache() });

  const taskListDataSource = new TaskListDataSource();
  taskListDataSource.initialize({ context: {}, cache: new InMemoryLRUCache() });

  return {
    users: userDataSource,
    taskLists: taskListDataSource,
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

const port = process.env.PORT || 4000;

server.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
