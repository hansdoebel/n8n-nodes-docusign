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
        displayName: "Include Charges",
        name: "include_charges",
        type: "boolean",
        default: true,
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

  if (additionalFields.include_charges !== undefined) {
    qs.include_charges = additionalFields.include_charges;
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    API_ENDPOINTS.BILLING_CHARGES,
    {},
    qs,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
