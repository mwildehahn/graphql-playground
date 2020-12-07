import { ApolloServer } from "apollo-server-micro";

import schema from "../../schema";
import dataSources from "../../schema/data-sources";
import context from "../../apollo/context";
import { NextApiRequest, NextApiResponse } from "next";

const server = new ApolloServer({
  schema,
  dataSources,
  context: async ({
    req,
    res,
  }: {
    req: NextApiRequest;
    res: NextApiResponse;
  }) => context({ req, res }),
  playground: {
    settings: {
      "request.credentials": "same-origin",
    },
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: "/api/graphql" });
