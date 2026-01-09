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
    displayName: "Service ID",
    name: "serviceId",
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
        displayName: "Redirect URL",
        name: "redirectUrl",
        type: "string",
        default: "",
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const serviceId = this.getNodeParameter("serviceId", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const qs: IDataObject = {};

  if (additionalFields.redirectUrl) {
    qs.redirectUrl = additionalFields.redirectUrl;
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    `${API_ENDPOINTS.CLOUD_STORAGE}/${serviceId}`,
    {},
    qs,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
