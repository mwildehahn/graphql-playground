import { interfaceType } from "@nexus/schema";

export const Node = interfaceType({
  name: "Node",
  resolveType(node) {
    return (node as any).email ? "UserGQL" : "TaskListGQL";
  },
  definition(t) {
    t.nonNull.id("id");
  },
});
