import { makeSchema, connectionPlugin } from "@nexus/schema";
import path from "path";

import * as UserTypes from "./user";
import * as TaskTypes from "./task";
import * as TaskListTypes from "./task-list";
import * as TaskListTaskTypes from "./task-list-task";
import * as MutationTypes from "./mutation";
import * as QueryTypes from "./query";
import * as InterfaceTypes from "./interfaces";

export * from "./user";
export * from "./task";
export * from "./task-list";
export * from "./task-list-task";
export * from "./mutation";
export * from "./query";

const schema = makeSchema({
  types: [
    UserTypes,
    TaskTypes,
    TaskListTypes,
    TaskListTaskTypes,
    MutationTypes,
    QueryTypes,
    InterfaceTypes,
  ],
  outputs: {
    schema: path.join(process.cwd(), "generated/schema.graphql"),
    typegen: path.join(process.cwd(), "generated/schema-typegen.ts"),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(process.cwd(), "./types.ts"),
        alias: "t",
      },
    ],
    contextType: "t.Context",
  },
  plugins: [connectionPlugin({ includeNodesField: true })],
});

export default schema;
