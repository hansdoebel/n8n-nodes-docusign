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
        displayName: "Permission Profile Name",
        name: "permissionProfileName",
        type: "string",
        default: "",
      },
      {
        displayName: "Settings",
        name: "settings",
        type: "json",
        default: "{}",
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

  const body: IDataObject = {};

  if (additionalFields.permissionProfileName) {
    body.permissionProfileName = additionalFields.permissionProfileName;
  }

  if (additionalFields.settings) {
    body.settings = JSON.parse(additionalFields.settings as string);
  }

  const response = await docusignApiRequest.call(
    this,
    "PUT",
    `${API_ENDPOINTS.PERMISSION_PROFILES}/${permissionProfileId}`,
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
