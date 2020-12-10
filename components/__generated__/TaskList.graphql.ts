/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskList = {
    readonly id: string;
    readonly title: string;
    readonly " $refType": "TaskList";
};
export type TaskList$data = TaskList;
export type TaskList$key = {
    readonly " $data"?: TaskList$data;
    readonly " $fragmentRefs": FragmentRefs<"TaskList">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TaskList",
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
  "type": "TaskListGQL",
  "abstractKey": null
};
(node as any).hash = '3a4798575070106bf7e9d22927d42b87';
export default node;
