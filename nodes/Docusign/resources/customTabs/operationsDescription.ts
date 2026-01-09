import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["customTabs"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a custom tab",
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a custom tab",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a custom tab",
      },
      {
        name: "List",
        value: "list",
        action: "List custom tabs",
      },
      {
        name: "Update",
        value: "update",
        action: "Update a custom tab",
      },
    ],
    default: "list",
  },
];
