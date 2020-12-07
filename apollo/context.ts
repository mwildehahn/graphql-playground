import isEmail from "isemail";
import { IncomingMessage, ServerResponse } from "http";

import dataSources from "../schema/data-sources";
import { getLoginSession } from "../lib/auth";

export default async function context({
  req,
  res,
}: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getLoginSession(req);
  if (!session) {
    return { user: null, req, res };
  }

  const user = await dataSources().users.fetchById(session.userId);
  return { user, req, res };
}
