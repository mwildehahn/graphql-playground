import { interfaceType } from "@nexus/schema";

export const Node = interfaceType({
  name: "Node",
  resolveType(node) {
    return (node as any).email !== undefined
      ? "UserGQL"
      : (node as any).completed !== undefined
      ? "TaskGQL"
      : "TaskListGQL";
  },
  definition(t) {
    t.nonNull.id("id");
  },
});
