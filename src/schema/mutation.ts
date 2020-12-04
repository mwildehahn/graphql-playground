import {
  idArg,
  list,
  nonNull,
  nullable,
  objectType,
  stringArg,
} from "@nexus/schema";

export const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.string("login", {
      args: { email: nonNull(stringArg()) },
      resolve: async (_, { email }, { dataSources }) => {
        const user = await dataSources.users.fetchOrCreate(email);
        if (user) {
          return Buffer.from(user.email).toString("base64");
        }

        return null;
      },
    });

    t.field("createTaskList", {
      type: "CreateTaskListResponse",
      args: { title: nonNull(stringArg()) },
      resolve: async (_, { title }, { dataSources, user }) => {
        if (user === undefined) return { ok: false };

        const list = await dataSources.taskLists.create({
          title,
          createdById: user.id,
        });

        return {
          ok: true,
          list,
        };
      },
    });
  },
});

export const CreateTaskListResponse = objectType({
  name: "CreateTaskListResponse",
  definition(t) {
    t.boolean("ok");
    t.field("list", {
      type: "TaskListGQL",
    });
  },
});
