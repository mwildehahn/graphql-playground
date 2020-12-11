/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskListRow = {
    readonly id: string;
    readonly title: string;
    readonly " $refType": "TaskListRow";
};
export type TaskListRow$data = TaskListRow;
export type TaskListRow$key = {
    readonly " $data"?: TaskListRow$data;
    readonly " $fragmentRefs": FragmentRefs<"TaskListRow">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TaskListRow",
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
(node as any).hash = '6aafc2d9cb8b33c20434cddb3ef0691d';
export default node;
