import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["diagnostics"],
      },
    },
    options: [
      {
        name: "Delete",
        value: "delete",
        action: "Delete request logs",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a request log",
      },
      {
        name: "List",
        value: "list",
        action: "List request logs",
      },
    ],
    default: "list",
  },
];
