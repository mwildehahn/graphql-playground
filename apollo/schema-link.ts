import { SchemaLink } from "@apollo/client/link/schema";
import context from "./context";
import schema from "../schema";

export default function schemaLink(token?: string) {
  return new SchemaLink({ schema, context: context(token) });
}
