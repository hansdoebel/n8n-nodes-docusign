import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["billing"],
      },
    },
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get billing plan",
      },
      {
        name: "Get Charges",
        value: "getCharges",
        action: "Get billing charges",
      },
      {
        name: "Get Invoices",
        value: "getInvoices",
        action: "Get billing invoices",
      },
    ],
    default: "get",
  },
];
