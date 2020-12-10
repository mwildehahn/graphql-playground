import { objectType } from "@nexus/schema";
import { DynamoDBDataSource } from "apollo-datasource-dynamodb";
import { ApolloError } from "apollo-server";
import { ClientConfiguration } from "aws-sdk/clients/dynamodb";
import { toGlobalId } from "graphql-relay";
import { v4 } from "uuid";

export interface Task {
  id: string;
  title: string;
  createdById: string;
  dateCreated: string;
  dateUpdated: string;
}

export const TaskGQL = objectType({
  name: "TaskGQL",
  definition(t) {
    // @ts-ignore should fix this with the generator
    t.nonNull.id("id", { resolve: (root) => toGlobalId("Task", root.id) });
    t.nonNull.string("title");
    t.nonNull.string("createdById");
    t.nonNull.string("dateCreated");
    t.nonNull.string("dateUpdated");
    t.nonNull.field("createdBy", {
      type: "UserGQL",
      resolve: async (task, _, { dataSources }) => {
        const user = await dataSources.users.fetchById(task.createdById);
        if (user === undefined) throw new ApolloError("failed to fetch user");
        return user;
      },
    });
    t.connectionField("lists", {
      type: "TaskListGQL",
      nodes: async (task, _, { dataSources }) => {
        const edges = await dataSources.taskListTasks.fetchListsForTask(
          // @ts-ignore should fix this with the generator
          task.id
        );
        return await dataSources.taskLists.fetchByIds(
          edges.map((edge) => edge.taskListId)
        );
      },
    });
  },
});

export class TaskDataSource extends DynamoDBDataSource<Task, {}> {
  readonly ttl = 60 * 60; // 1 hour

  constructor(config?: ClientConfiguration) {
    super(
      process.env.TASK_TABLE_NAME as string,
      [
        {
          AttributeName: "id",
          KeyType: "HASH",
        },
      ],
      config
    );
  }

  public async fetchByIds(ids: string[]): Promise<Task[]> {
    if (!ids.length) return [];

    const res = await this.dynamoDbDocClient
      .batchGet({
        RequestItems: {
          [this.tableName]: {
            Keys: ids.map((id) => ({ id })),
          },
        },
      })
      .promise();

    return (res.Responses?.[this.tableName] || []) as Task[];
  }

  public async fetchById(id: string): Promise<Task> {
    return await this.getItem(
      {
        TableName: this.tableName,
        Key: {
          id,
        },
      },
      this.ttl
    );
  }

  public async create({
    title,
    createdById,
  }: {
    title: string;
    createdById: string;
  }): Promise<Task> {
    const now = new Date().toString();
    return await this.put({
      id: v4(),
      title,
      createdById,
      dateCreated: now,
      dateUpdated: now,
    });
  }
}
