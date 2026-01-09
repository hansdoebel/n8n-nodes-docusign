import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["users"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a user",
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a user",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a user",
      },
      {
        name: "List",
        value: "list",
        action: "List users",
      },
      {
        name: "Update",
        value: "update",
        action: "Update a user",
      },
    ],
    default: "list",
  },
];
