import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["notary"],
      },
    },
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get a notary journal",
      },
      {
        name: "List",
        value: "list",
        action: "List notary journals",
      },
    ],
    default: "list",
  },
];
