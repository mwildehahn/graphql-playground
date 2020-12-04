import { DynamoDBDataSource } from "apollo-datasource-dynamodb";
import { ClientConfiguration } from "aws-sdk/clients/acm";

export interface TaskListTask {
  taskListId: string;
  taskId: string;
  createdById: string;
  dateCreated: string;
}

export class TaskListTaskDataSource extends DynamoDBDataSource<
  TaskListTask,
  {}
> {
  readonly ttl = 60 * 60;

  constructor(config?: ClientConfiguration) {
    super(
      process.env.TASK_LIST_TASK_TABLE_NAME as string,
      [
        {
          AttributeName: "taskListId",
          KeyType: "HASH",
        },
        {
          AttributeName: "taskId",
          KeyType: "RANGE",
        },
      ],
      config
    );
  }

  public async fetchTasksForList(taskListId: string): Promise<TaskListTask[]> {
    return await this.query(
      {
        TableName: this.tableName,
        KeyConditionExpression: "taskListId = :taskListId",
        ExpressionAttributeValues: {
          ":taskListId": taskListId,
        },
      },
      this.ttl
    );
  }

  public async fetchListsForTask(taskId: string): Promise<TaskListTask[]> {
    return await this.query(
      {
        TableName: this.tableName,
        IndexName: "taskIdIndex",
        KeyConditionExpression: "taskId = :taskId",
        ExpressionAttributeValues: {
          ":taskId": taskId,
        },
      },
      this.ttl
    );
  }

  public async create({
    taskId,
    taskListId,
    createdById,
  }: {
    taskId: string;
    taskListId: string;
    createdById: string;
  }): Promise<TaskListTask> {
    const now = new Date().toString();
    return await this.put({
      taskId,
      taskListId,
      createdById,
      dateCreated: now,
    });
  }
}
