import { objectType } from "@nexus/schema";
import { venn } from "@nexus/schema/dist/core";
import { DynamoDBDataSource } from "apollo-datasource-dynamodb";
import { ApolloError } from "apollo-server";
import { ClientConfiguration } from "aws-sdk/clients/dynamodb";
import { v4 } from "uuid";

export interface TaskList {
  id: string;
  createdById: string;
  title: string;
}

export const TaskListGQL = objectType({
  name: "TaskListGQL",
  definition(t) {
    t.id("id");
    t.nonNull.string("createdById");
    t.nonNull.string("title");
    t.field("createdBy", {
      type: "UserGQL",
      resolve: async (list, _, { dataSources }) => {
        const user = await dataSources.users.fetchById(list.createdById);
        if (user === undefined) throw new ApolloError("failed to fetch user");
        return user;
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
          KeyType: "Hash",
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
    return await this.put(
      {
        id: v4(),
        createdById,
        title,
      },
      this.ttl
    );
  }
}
