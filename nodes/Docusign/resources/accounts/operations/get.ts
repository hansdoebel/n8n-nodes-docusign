import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";

export const description: INodeProperties[] = [
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Include Account Settings",
        name: "include_account_settings",
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

  if (additionalFields.include_account_settings !== undefined) {
    qs.include_account_settings = additionalFields.include_account_settings;
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    "",
    {},
    qs,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
