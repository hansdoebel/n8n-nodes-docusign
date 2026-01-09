import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["workspaces"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a workspace",
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a workspace",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a workspace",
      },
      {
        name: "List",
        value: "list",
        action: "List workspaces",
      },
      {
        name: "Update",
        value: "update",
        action: "Update a workspace",
      },
    ],
    default: "list",
  },
];
