import { serialize, parse } from "cookie";
import { NextApiRequest } from "next";
import { IncomingMessage, ServerResponse } from "http";

const TOKEN_NAME = "token";

export const MAX_AGE = 60 * 60 * 8; // 8 hours

export function setTokenCookie(res: ServerResponse, token: string) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
  });

  res.setHeader("Set-Cookie", cookie);
}

export function removeTokenCookie(res: ServerResponse) {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
}

export function parseCookies(req: NextApiRequest | IncomingMessage) {
  if (isNextApiRequest(req)) {
    return req.cookies;
  }

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || "");
}

export function getTokenCookie(req: IncomingMessage | NextApiRequest) {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
}

function isNextApiRequest(
  req: NextApiRequest | IncomingMessage
): req is NextApiRequest {
  return (req as any).cookies !== undefined;
}
