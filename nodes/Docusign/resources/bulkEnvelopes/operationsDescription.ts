import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["bulkEnvelopes"],
      },
    },
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get a bulk send batch",
      },
      {
        name: "List",
        value: "list",
        action: "List bulk send batches",
      },
    ],
    default: "list",
  },
];
