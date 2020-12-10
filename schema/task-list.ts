import { objectType } from "@nexus/schema";
import { DynamoDBDataSource } from "apollo-datasource-dynamodb";
import { ApolloError } from "apollo-server";
import { ClientConfiguration } from "aws-sdk/clients/dynamodb";
import { toGlobalId } from "graphql-relay";
import { v4 } from "uuid";
import { connectionFromArray } from "../lib/graphql-relay";

export interface TaskList {
  id: string;
  createdById: string;
  title: string;
  dateCreated: string;
  dateUpdated: string;
}

export const TaskListGQL = objectType({
  name: "TaskListGQL",
  definition(t) {
    t.implements("Node");

    // @ts-ignore should fix this with the generator
    t.nonNull.id("id", { resolve: (root) => toGlobalId("TaskList", root.id) });
    t.nonNull.string("createdById");
    t.nonNull.string("title");
    t.nonNull.field("createdBy", {
      type: "UserGQL",
      resolve: async (list, _, { dataSources }) => {
        const user = await dataSources.users.fetchById(list.createdById);
        if (user === undefined) throw new ApolloError("failed to fetch user");
        return user;
      },
    });
    t.connectionField("tasks", {
      type: "TaskGQL",
      resolve: async (list, args, { dataSources }) => {
        const edges = await dataSources.taskListTasks.fetchTasksForList(
          // @ts-ignore should fix this with the generator
          list.id
        );
        const taskIds = edges.map((edge) => edge.taskId);
        return connectionFromArray(
          await dataSources.tasks.fetchByIds(taskIds),
          args
        );
      },
    });
  },
});

export class TaskListDataSource extends DynamoDBDataSource<TaskList, {}> {
  readonly ttl = 60 * 60; // 1 hour

  constructor(config?: ClientConfiguration) {
    super(
      process.env.TASK_LIST_TABLE_NAME as string,
      [
        {
          AttributeName: "id",
          KeyType: "HASH",
        },
        {
          AttributeName: "createdById",
          KeyType: "string",
        },
      ],
      config
    );
  }

  public async fetchByCreatedById(createdById: string): Promise<TaskList[]> {
    return await this.query({
      TableName: this.tableName,
      IndexName: "createdByIdIndex",
      KeyConditionExpression: "createdById = :createdById",
      ExpressionAttributeValues: {
        ":createdById": createdById,
      },
    });
  }

  public async create({
    createdById,
    title,
  }: {
    createdById: string;
    title: string;
  }): Promise<TaskList> {
    const now = new Date().toString();
    return await this.put(
      {
        id: v4(),
        createdById,
        title,
        dateCreated: now,
        dateUpdated: now,
      },
      this.ttl
    );
  }

  public async fetchByIds(ids: string[]): Promise<TaskList[]> {
    if (!ids.length) return [];

    const keys = ids.map((id) => ({ id }));
    const res = await this.dynamoDbDocClient
      .batchGet({
        RequestItems: {
          [this.tableName]: {
            Keys: keys,
          },
        },
      })
      .promise();

    return (res.Responses?.[this.tableName] || []) as TaskList[];
  }

  public async fetchById(id: string): Promise<TaskList> {
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
}
