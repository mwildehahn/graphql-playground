import { objectType, nullable, nonNull, idArg } from "@nexus/schema";

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("viewer", {
      type: nullable("UserGQL"),
      resolve: (root, args, ctx) => {
        return ctx.user || null;
      },
    });

    t.field("node", {
      type: nullable("Node"),
      args: {
        id: nonNull(idArg()),
      },
      resolve: (root, args, ctx) => {
        return null;
      },
    });
  },
});
