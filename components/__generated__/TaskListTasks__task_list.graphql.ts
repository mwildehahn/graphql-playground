/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskListTasks__task_list = {
    readonly tasks: {
        readonly edges: ReadonlyArray<{
            readonly __id: string;
            readonly node: {
                readonly id: string;
            } | null;
        } | null> | null;
    } | null;
    readonly id: string;
    readonly " $refType": "TaskListTasks__task_list";
};
export type TaskListTasks__task_list$data = TaskListTasks__task_list;
export type TaskListTasks__task_list$key = {
    readonly " $data"?: TaskListTasks__task_list$data;
    readonly " $fragmentRefs": FragmentRefs<"TaskListTasks__task_list">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "tasks"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
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
      "operation": require('./TaskListTasksPaginationQuery.graphql.ts'),
      "identifierField": "id"
    }
  },
  "name": "TaskListTasks__task_list",
  "selections": [
    {
      "alias": "tasks",
      "args": null,
      "concreteType": "TaskGQLConnection",
      "kind": "LinkedField",
      "name": "__TaskListTasks_tasks_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "TaskGQLEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "TaskGQL",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
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
      "storageKey": null
    },
    (v1/*: any*/)
  ],
  "type": "TaskListGQL",
  "abstractKey": null
};
})();
(node as any).hash = '72b37662df1b5171ab8d3f8ed5c89066';
export default node;
