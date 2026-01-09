import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["powerForms"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: 'Create a power form',
      },
      {
        name: "Delete",
        value: "delete",
        action: 'Delete a power form',
      },
      {
        name: "Get",
        value: "get",
        action: 'Get a power form',
      },
      {
        name: "List",
        value: "list",
        action: 'List power forms',
      },
      {
        name: "Update",
        value: "update",
        action: 'Update a power form',
      },
    ],
    default: "list",
  },
];
