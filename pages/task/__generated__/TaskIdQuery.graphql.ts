/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TaskIdQueryVariables = {
    id: string;
};
export type TaskIdQueryResponse = {
    readonly node: {
        readonly title?: string;
    } | null;
};
export type TaskIdQuery = {
    readonly response: TaskIdQueryResponse;
    readonly variables: TaskIdQueryVariables;
};



/*
query TaskIdQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on TaskGQL {
      title
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "TaskGQL",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TaskIdQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TaskIdQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a8ac370dbaf27c8152065efb58cfe067",
    "id": null,
    "metadata": {},
    "name": "TaskIdQuery",
    "operationKind": "query",
    "text": "query TaskIdQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on TaskGQL {\n      title\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '77f5d6eb5941b5af78a578ba6b649ca7';
export default node;
