import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["cloudStorage"],
      },
    },
    options: [
      {
        name: "Delete",
        value: "delete",
        action: "Delete a cloud storage provider",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a cloud storage provider",
      },
      {
        name: "List",
        value: "list",
        action: "List cloud storage providers",
      },
    ],
    default: "list",
  },
];
