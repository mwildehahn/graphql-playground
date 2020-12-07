import isEmail from "isemail";

import dataSources from "../schema/data-sources";

export default async function context(token?: string) {
  console.log("Setting up context", { token });
  // simple auth check on every request
  const email = Buffer.from(token || "", "base64").toString("ascii");

  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) {
    return { user: null };
  }

  // find a user by their email
  const user = await dataSources().users.fetchOrCreate(email);

  return { user };
}
