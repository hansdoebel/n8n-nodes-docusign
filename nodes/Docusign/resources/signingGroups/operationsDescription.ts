import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["signingGroups"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a signing group",
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a signing group",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a signing group",
      },
      {
        name: "List",
        value: "list",
        action: "List signing groups",
      },
      {
        name: "Update",
        value: "update",
        action: "Update a signing group",
      },
    ],
    default: "list",
  },
];
