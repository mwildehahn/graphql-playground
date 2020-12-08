import Iron from "@hapi/iron";
import { NextApiRequest } from "next";
import { IncomingMessage, ServerResponse } from "http";
import { Session } from "../../types";
import { MAX_AGE, setTokenCookie, getTokenCookie } from "./cookies";

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export async function setLoginSession(
  res: ServerResponse,
  session: Partial<Session> & { userId: string }
) {
  const createdAt = Date.now();
  // Create a session object with a max age that we can validate later
  const obj: Session = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(res, token);
}

export async function getLoginSession(
  req: NextApiRequest | IncomingMessage
): Promise<Session | undefined> {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    return { userId: authHeader, createdAt: Date.now(), maxAge: MAX_AGE };
  }

  const token = getTokenCookie(req);
  if (!token) return;

  const session: Session = await Iron.unseal(
    token,
    TOKEN_SECRET,
    Iron.defaults
  );
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() < expiresAt) {
    return session;
  }
}
