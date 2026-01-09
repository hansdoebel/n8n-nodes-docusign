import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["folders"],
      },
    },
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get a folder",
      },
      {
        name: "Get Items",
        value: "getItems",
        action: "Get folder items",
      },
      {
        name: "List",
        value: "list",
        action: "List folders",
      },
    ],
    default: "list",
  },
];
