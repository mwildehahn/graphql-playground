/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TaskIdQueryVariables = {
    id: string;
};
export type TaskIdQueryResponse = {
    readonly node: {
        readonly id?: string;
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
      id
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
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
          {
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "type": "TaskGQL",
            "abstractKey": null
          }
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
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/)
            ],
            "type": "TaskGQL",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7b7102c1f5ded9c34a4239cbaccbf914",
    "id": null,
    "metadata": {},
    "name": "TaskIdQuery",
    "operationKind": "query",
    "text": "query TaskIdQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on TaskGQL {\n      id\n      title\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bb14e3d0435c3c131f1f5abdd58b88fa';
export default node;
