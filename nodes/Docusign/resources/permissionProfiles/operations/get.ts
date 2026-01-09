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
    displayName: "Permission Profile ID",
    name: "permissionProfileId",
    type: "string",
    required: true,
    default: "",
  },
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
        ],
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const permissionProfileId = this.getNodeParameter(
    "permissionProfileId",
    index,
  ) as string;
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
    `${API_ENDPOINTS.PERMISSION_PROFILES}/${permissionProfileId}`,
    {},
    qs,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
