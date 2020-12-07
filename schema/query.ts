import { objectType, nullable } from "@nexus/schema";

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("viewer", {
      type: nullable("UserGQL"),
      resolve: (root, args, ctx) => {
        return ctx.user || null;
      },
    });
  },
});
