import { objectType, nullable, nonNull, idArg } from "@nexus/schema";
import { fromGlobalId } from "graphql-relay";
import { Task } from "./task";
import { TaskList } from "./task-list";

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
      resolve: async (_, { id: globalId }, { dataSources }) => {
        const { id, type } = fromGlobalId(globalId);

        let node: Task | TaskList | null = null;
        switch (type) {
          case "TaskList":
            node = await dataSources.taskLists.fetchById(id);
            break;
          case "Task":
            node = await dataSources.tasks.fetchById(id);
            break;
        }

        return node;
      },
    });
  },
});
