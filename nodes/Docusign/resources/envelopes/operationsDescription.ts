import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["envelopes"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create an envelope",
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete an envelope",
      },
      {
        name: "Get",
        value: "get",
        action: "Get an envelope",
      },
      {
        name: "List",
        value: "list",
        action: "List envelopes",
      },
      {
        name: "Update",
        value: "update",
        action: "Update an envelope",
      },
    ],
    default: "create",
  },
];
