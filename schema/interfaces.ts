import { interfaceType } from "@nexus/schema";

export const Node = interfaceType({
  name: "Node",
  resolveType(node) {
    return "UserGQL";
  },
  definition(t) {
    t.nonNull.id("id");
  },
});
