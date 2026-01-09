import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "../../../utils";

export const description: INodeProperties[] = [
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Exclude Distributor Brand",
        name: "exclude_distributor_brand",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Include Logos",
        name: "include_logos",
        type: "boolean",
        default: false,
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

  if (additionalFields.exclude_distributor_brand !== undefined) {
    qs.exclude_distributor_brand = additionalFields.exclude_distributor_brand;
  }

  if (additionalFields.include_logos !== undefined) {
    qs.include_logos = additionalFields.include_logos;
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    "/brands",
    {},
    qs,
  );

  return this.helpers.returnJsonArray(response.brands || []);
}
