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
        displayName: "Group Type",
        name: "group_type",
        type: "string",
        default: "",
      },
      {
        displayName: "Include Users",
        name: "include_users",
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

  if (additionalFields.group_type) {
    qs.group_type = additionalFields.group_type;
  }

  if (additionalFields.include_users !== undefined) {
    qs.include_users = additionalFields.include_users;
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    API_ENDPOINTS.SIGNING_GROUPS,
    {},
    qs,
  );

  return this.helpers.returnJsonArray(response.groups || []);
}
