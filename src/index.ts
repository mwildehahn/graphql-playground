import { makeSchema } from "@nexus/schema";
import { ApolloServer } from "apollo-server";
import { Request } from "express";
import path from "path";
import * as types from "./schema";

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

const dataSources = () => ({});

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }: { req: Request }) => {
  return { user: null };
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
