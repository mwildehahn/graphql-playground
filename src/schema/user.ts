import { objectType } from "@nexus/schema";
import { DynamoDBDataSource } from "apollo-datasource-dynamodb";
import { DocumentClient, ClientConfiguration } from "aws-sdk/clients/dynamodb";
import { v4 } from "uuid";

export interface User {
  id: string;
  email: string;
}

export const UserGQL = objectType({
  name: "UserGQL",
  definition(t) {
    t.id("id");
    t.string("email");
  },
});

export class UserDataSource extends DynamoDBDataSource<User, {}> {
  readonly ttl = 60 * 60; // 1 hour

  constructor(config?: ClientConfiguration) {
    super(
      process.env.USER_TABLE_NAME as string,
      [
        {
          AttributeName: "id",
          KeyType: "HASH",
        },
        {
          AttributeName: "email",
          KeyType: "string",
        },
      ],
      config
    );
  }

  public async fetchOrCreate(email: string): Promise<User> {
    const users = await this.query(
      {
        TableName: this.tableName,
        IndexName: "emailIndex",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: {
          ":email": email,
        },
      },
      this.ttl
    );
    if (users.length) {
      return users[0];
    }

    const user = await this.put(
      {
        id: v4(),
        email,
      },
      this.ttl
    );

    return user;
  }
}
