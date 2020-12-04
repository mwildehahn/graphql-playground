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

    t.field("createTask", {
      type: "CreateTaskResponse",
      args: { title: nonNull(stringArg()), taskListId: nonNull(idArg()) },
      resolve: async (_, { title, taskListId }, { dataSources, user }) => {
        if (user === undefined) return { ok: false };

        // create the task
        const task = await dataSources.tasks.create({
          taskListId,
          title,
          createdById: user.id,
        });

        // store the association to the list
        await dataSources.taskListTasks.create({
          taskId: task.id,
          taskListId,
          createdById: user.id,
        });

        return {
          ok: true,
          task,
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

export const CreateTaskResponse = objectType({
  name: "CreateTaskResponse",
  definition(t) {
    t.boolean("ok");
    t.field("task", {
      type: "TaskGQL",
    });
  },
});
