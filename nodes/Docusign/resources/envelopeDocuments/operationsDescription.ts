import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["envelopeDocuments"],
      },
    },
    options: [
      {
        name: "Delete",
        value: "delete",
        action: "Delete documents from an envelope",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a document from an envelope",
      },
      {
        name: "List",
        value: "list",
        action: "List documents in an envelope",
      },
      {
        name: "Update",
        value: "update",
        action: "Add or replace a document in an envelope",
      },
      {
        name: "Update List",
        value: "updateList",
        action: "Add or replace multiple documents in an envelope",
      },
    ],
    default: "get",
  },
];
