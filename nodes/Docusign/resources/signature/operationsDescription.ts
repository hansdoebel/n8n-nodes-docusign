import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["signature"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a signature",
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a signature",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a signature",
      },
      {
        name: "List",
        value: "list",
        action: "List signatures",
      },
      {
        name: "Update",
        value: "update",
        action: "Update a signature",
      },
    ],
    default: "list",
  },
];
