import { ApolloServer } from "apollo-server-micro";
import { Request } from "express";

import schema from "../../schema";
import dataSources from "../../schema/data-sources";
import context from "../../apollo/context";

const server = new ApolloServer({
  schema,
  dataSources,
  context: async ({ req }: { req: Request }) => {
    return context(req.headers.authorization || "");
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: "/api/graphql" });
