/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskLists_user = {
    readonly taskLists: {
        readonly edges: ReadonlyArray<{
            readonly __id: string;
            readonly node: {
                readonly " $fragmentRefs": FragmentRefs<"TaskListRow">;
            } | null;
        } | null> | null;
    } | null;
    readonly id: string;
    readonly " $refType": "TaskLists_user";
};
export type TaskLists_user$data = TaskLists_user;
export type TaskLists_user$key = {
    readonly " $data"?: TaskLists_user$data;
    readonly " $fragmentRefs": FragmentRefs<"TaskLists_user">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "taskLists"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./TaskListPaginationQuery.graphql.ts'),
      "identifierField": "id"
    }
  },
  "name": "TaskLists_user",
  "selections": [
    {
      "alias": "taskLists",
      "args": null,
      "concreteType": "TaskListGQLConnection",
      "kind": "LinkedField",
      "name": "__TaskLists_taskLists_connection",
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "TaskListRow"
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
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "UserGQL",
  "abstractKey": null
};
})();
(node as any).hash = '18ac304acd4fcdb90b28075ce0247ed3';
export default node;
