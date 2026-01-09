import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["templates"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a template",
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a template",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a template",
      },
      {
        name: "List",
        value: "list",
        action: "List templates",
      },
      {
        name: "Update",
        value: "update",
        action: "Update a template",
      },
    ],
    default: "create",
  },
];
