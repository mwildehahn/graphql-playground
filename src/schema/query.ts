import { objectType, nullable } from "@nexus/schema";

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("viewer", {
      type: nullable("User"),
      resolve: (root, args, ctx) => {
        return null;
      },
    });
  },
});
