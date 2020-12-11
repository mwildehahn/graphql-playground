/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type pagesQueryVariables = {};
export type pagesQueryResponse = {
    readonly viewer: {
        readonly email: string;
        readonly " $fragmentRefs": FragmentRefs<"TaskLists_user">;
    } | null;
};
export type pagesQuery = {
    readonly response: pagesQueryResponse;
    readonly variables: pagesQueryVariables;
};



/*
query pagesQuery {
  viewer {
    email
    ...TaskLists_user
    id
  }
}

fragment TaskListRow on TaskListGQL {
  id
  title
}

fragment TaskLists_user on UserGQL {
  taskLists(first: 10) {
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
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pagesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserGQL",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pagesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserGQL",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": (v1/*: any*/),
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
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
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
            "storageKey": "taskLists(first:10)"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "TaskLists_taskLists",
            "kind": "LinkedHandle",
            "name": "taskLists"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b85901baa3d8e5250241deca5e2ca612",
    "id": null,
    "metadata": {},
    "name": "pagesQuery",
    "operationKind": "query",
    "text": "query pagesQuery {\n  viewer {\n    email\n    ...TaskLists_user\n    id\n  }\n}\n\nfragment TaskListRow on TaskListGQL {\n  id\n  title\n}\n\nfragment TaskLists_user on UserGQL {\n  taskLists(first: 10) {\n    edges {\n      node {\n        ...TaskListRow\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
  }
};
})();
(node as any).hash = '0b36b7a1aca7bb02b75b8372d1dddd80';
export default node;
