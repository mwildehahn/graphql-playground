import { IncomingMessage, ServerResponse } from "http";
import { SchemaLink } from "@apollo/client/link/schema";
import schema from "../schema";
import { initializeApollo } from "./client";
import context from "./context";

export default async function initializeSSR({
  req,
  res,
}: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const link = new SchemaLink({
    schema,
    context: () => context({ req, res }),
  });

  return await initializeApollo({
    link,
  });
}
