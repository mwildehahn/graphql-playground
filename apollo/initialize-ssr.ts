import { initializeApollo } from "./client";
import schemaLink from "./schema-link";

export default async function initializeSSR() {
  const link = schemaLink();
  return await initializeApollo({
    link,
  });
}
