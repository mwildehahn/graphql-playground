/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateTaskData = {
    taskListId: string;
    title: string;
};
export type TaskListIdMutationVariables = {
    input: CreateTaskData;
};
export type TaskListIdMutationResponse = {
    readonly createTask: {
        readonly taskEdge: {
            readonly __id: string;
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly title: string;
            } | null;
        } | null;
    } | null;
};
export type TaskListIdMutation = {
    readonly response: TaskListIdMutationResponse;
    readonly variables: TaskListIdMutationVariables;
};



/*
mutation TaskListIdMutation(
  $input: CreateTaskData!
) {
  createTask(data: $input) {
    taskEdge {
      cursor
      node {
        id
        title
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "data",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateTaskResponse",
    "kind": "LinkedField",
    "name": "createTask",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TaskGQLEdge",
        "kind": "LinkedField",
        "name": "taskEdge",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "cursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TaskGQL",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "ClientExtension",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__id",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TaskListIdMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TaskListIdMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "74a5c39b58622cf6ea7b3a50d875ffa7",
    "id": null,
    "metadata": {},
    "name": "TaskListIdMutation",
    "operationKind": "mutation",
    "text": "mutation TaskListIdMutation(\n  $input: CreateTaskData!\n) {\n  createTask(data: $input) {\n    taskEdge {\n      cursor\n      node {\n        id\n        title\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bfb804aa4400ef49dfbf2c6bf71a9f7b';
export default node;
