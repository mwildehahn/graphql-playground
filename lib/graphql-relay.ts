import {
  ConnectionArguments,
  connectionFromArray as originalConnectionFromArray,
} from "graphql-relay";

export function connectionFromArray<T>(items: T[], args: ConnectionArguments) {
  const { edges, pageInfo } = originalConnectionFromArray(items, args);
  return {
    edges,
    pageInfo: {
      ...pageInfo,
      hasNextPage: !!pageInfo.hasNextPage,
      hasPreviousPage: !!pageInfo.hasPreviousPage,
    },
  };
}
