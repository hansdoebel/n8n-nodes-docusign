import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["accounts"],
      },
    },
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get account information",
      },
      {
        name: "Get Brands",
        value: "getBrands",
        action: "Get account brands",
      },
    ],
    default: "get",
  },
];
