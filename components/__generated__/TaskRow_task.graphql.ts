/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskRow_task = {
    readonly id: string;
    readonly title: string;
    readonly " $refType": "TaskRow_task";
};
export type TaskRow_task$data = TaskRow_task;
export type TaskRow_task$key = {
    readonly " $data"?: TaskRow_task$data;
    readonly " $fragmentRefs": FragmentRefs<"TaskRow_task">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TaskRow_task",
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
  "type": "TaskGQL",
  "abstractKey": null
};
(node as any).hash = 'ba8dc1c82c2b0563e65306757a700bd8';
export default node;
