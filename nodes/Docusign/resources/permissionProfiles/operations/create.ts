import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "../../../utils";
import { API_ENDPOINTS } from "../../../utils/constants";

export const description: INodeProperties[] = [
  {
    displayName: "Permission Profile Name",
    name: "permissionProfileName",
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
  const permissionProfileName = this.getNodeParameter(
    "permissionProfileName",
    index,
  ) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const body: IDataObject = {
    permissionProfileName,
  };

  if (additionalFields.settings) {
    body.settings = JSON.parse(additionalFields.settings as string);
  }

  const response = await docusignApiRequest.call(
    this,
    "POST",
    API_ENDPOINTS.PERMISSION_PROFILES,
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
