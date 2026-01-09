import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["connect"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: 'Create a connect configuration',
      },
      {
        name: "Delete",
        value: "delete",
        action: 'Delete a connect configuration',
      },
      {
        name: "Get",
        value: "get",
        action: 'Get a connect configuration',
      },
      {
        name: "List",
        value: "list",
        action: 'List connect configurations',
      },
      {
        name: "Update",
        value: "update",
        action: 'Update a connect configuration',
      },
    ],
    default: "list",
  },
];
