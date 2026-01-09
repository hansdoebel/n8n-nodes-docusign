import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";
import { API_ENDPOINTS } from "@utils/constants";

export const description: INodeProperties[] = [
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "From Date",
        name: "from_date",
        type: "dateTime",
        default: "",
      },
      {
        displayName: "To Date",
        name: "to_date",
        type: "dateTime",
        default: "",
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const qs: IDataObject = {};

  if (additionalFields.from_date) {
    qs.from_date = additionalFields.from_date;
  }

  if (additionalFields.to_date) {
    qs.to_date = additionalFields.to_date;
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    API_ENDPOINTS.BILLING_INVOICES,
    {},
    qs,
  );

  return this.helpers.returnJsonArray(response.billingInvoices || []);
}
