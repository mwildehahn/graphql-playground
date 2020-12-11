/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskListPaginationQueryVariables = {
    count?: number | null;
    cursor?: string | null;
    id: string;
};
export type TaskListPaginationQueryResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"TaskLists_user">;
    } | null;
};
export type TaskListPaginationQuery = {
    readonly response: TaskListPaginationQueryResponse;
    readonly variables: TaskListPaginationQueryVariables;
};



/*
query TaskListPaginationQuery(
  $count: Int = 10
  $cursor: String
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...TaskLists_user_1G22uz
    id
  }
}

fragment TaskListRow on TaskListGQL {
  id
  title
}

fragment TaskLists_user_1G22uz on UserGQL {
  taskLists(after: $cursor, first: $count) {
    edges {
      node {
        ...TaskListRow
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 10,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
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
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TaskListPaginationQuery",
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
            "args": [
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              }
            ],
            "kind": "FragmentSpread",
            "name": "TaskLists_user"
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
    "name": "TaskListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v4/*: any*/),
                "concreteType": "TaskListGQLConnection",
                "kind": "LinkedField",
                "name": "taskLists",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TaskListGQLEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "TaskListGQL",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "title",
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cursor",
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "TaskLists_taskLists",
                "kind": "LinkedHandle",
                "name": "taskLists"
              }
            ],
            "type": "UserGQL",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e2834604d5b0bb635de5e558d54737d2",
    "id": null,
    "metadata": {},
    "name": "TaskListPaginationQuery",
    "operationKind": "query",
    "text": "query TaskListPaginationQuery(\n  $count: Int = 10\n  $cursor: String\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...TaskLists_user_1G22uz\n    id\n  }\n}\n\nfragment TaskListRow on TaskListGQL {\n  id\n  title\n}\n\nfragment TaskLists_user_1G22uz on UserGQL {\n  taskLists(after: $cursor, first: $count) {\n    edges {\n      node {\n        ...TaskListRow\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
  }
};
})();
(node as any).hash = '18ac304acd4fcdb90b28075ce0247ed3';
export default node;
