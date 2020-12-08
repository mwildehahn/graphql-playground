import { IncomingMessage, ServerResponse } from "http";

import dataSources from "../schema/data-sources";
import { getLoginSession } from "../lib/auth";

export default async function context({
  req,
  res,
  includeDataSources,
}: {
  req: IncomingMessage;
  res: ServerResponse;
  includeDataSources?: boolean;
}) {
  const session = await getLoginSession(req);
  if (!session) {
    const out: any = { user: null, req, res };
    if (includeDataSources) out.dataSources = dataSources();
    return out;
  }

  const user = await dataSources().users.fetchById(session.userId);
  const out: any = { user, req, res };
  if (includeDataSources) out.dataSources = dataSources();
  return out;
}
