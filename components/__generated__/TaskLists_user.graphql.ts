/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskLists_user = {
    readonly taskLists: {
        readonly nodes: ReadonlyArray<{
            readonly id: string;
            readonly title: string;
        } | null> | null;
    } | null;
    readonly " $refType": "TaskLists_user";
};
export type TaskLists_user$data = TaskLists_user;
export type TaskLists_user$key = {
    readonly " $data"?: TaskLists_user$data;
    readonly " $fragmentRefs": FragmentRefs<"TaskLists_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TaskLists_user",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        }
      ],
      "concreteType": "TaskListGQLConnection",
      "kind": "LinkedField",
      "name": "taskLists",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "TaskListGQL",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
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
        }
      ],
      "storageKey": "taskLists(first:10)"
    }
  ],
  "type": "UserGQL",
  "abstractKey": null
};
(node as any).hash = 'e3cc53a8ef54d22cdeade88ab2575af1';
export default node;
