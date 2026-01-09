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
        displayName: "Include",
        name: "include",
        type: "options",
        default: 'metadata',
        options: [
          { name: "Metadata", value: "metadata" },
          { name: "User Count", value: "user_count" },
          { name: "Closed Users", value: "closed_users" },
        ],
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

  if (additionalFields.include) {
    qs.include = additionalFields.include;
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    API_ENDPOINTS.PERMISSION_PROFILES,
    {},
    qs,
  );

  return this.helpers.returnJsonArray(response.permissionProfiles || []);
}
