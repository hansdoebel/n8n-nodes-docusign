import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["groups"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a group",
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a group",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a group",
      },
      {
        name: "List",
        value: "list",
        action: "List groups",
      },
      {
        name: "Update",
        value: "update",
        action: "Update a group",
      },
    ],
    default: "list",
  },
];
