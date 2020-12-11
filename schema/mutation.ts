import {
  idArg,
  inputObjectType,
  list,
  nonNull,
  nullable,
  objectType,
  stringArg,
} from "@nexus/schema";
import {
  fromGlobalId,
  cursorForObjectInConnection,
  offsetToCursor,
} from "graphql-relay";
import { setLoginSession } from "../lib/auth";

export const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("login", {
      type: "UserGQL",
      args: { email: nonNull(stringArg()) },
      resolve: async (_, { email }, { res, dataSources }) => {
        const user = await dataSources.users.fetchOrCreate(email);
        if (user) {
          await setLoginSession(res, { userId: user.id });
        }

        return user;
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
      args: { data: nonNull(CreateTaskData.asArg()) },
      resolve: async (
        _,
        { data: { taskListId: globalTaskListId, title } },
        { dataSources, user }
      ) => {
        if (user === undefined) return { ok: false };
        const { id: taskListId } = fromGlobalId(globalTaskListId);

        // create the task
        const task = await dataSources.tasks.create({
          title,
          createdById: user.id,
        });

        // store the association to the list
        await dataSources.taskListTasks.create({
          taskId: task.id,
          taskListId,
          createdById: user.id,
        });

        // TODO: refactor this since we share this logic elsewhere. Need to figure out how to fetch from multiple data sources.
        const edges = await dataSources.taskListTasks.fetchTasksForList(
          // @ts-ignore should fix this with the generator
          taskListId
        );
        const taskIds = edges.map((edge) => edge.taskId);
        const tasks = await dataSources.tasks.fetchByIds(taskIds);

        return {
          ok: true,
          taskEdge: {
            cursor: offsetToCursor(tasks.length),
            node: task,
          },
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

export const CreateTaskData = inputObjectType({
  name: "CreateTaskData",
  definition(t) {
    t.nonNull.string("taskListId");
    t.nonNull.string("title");
  },
});

export const CreateTaskResponse = objectType({
  name: "CreateTaskResponse",
  definition(t) {
    t.boolean("ok");
    t.field("taskEdge", {
      type: "TaskGQLEdge",
    });
  },
});
