import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["organizations"],
      },
    },
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get organization information",
      },
    ],
    default: "get",
  },
];
