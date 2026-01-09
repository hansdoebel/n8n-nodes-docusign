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
    displayName: "Service ID",
    name: "serviceId",
    type: "string",
    required: true,
    default: "",
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const serviceId = this.getNodeParameter("serviceId", index) as string;

  const response = await docusignApiRequest.call(
    this,
    "DELETE",
    `${API_ENDPOINTS.CLOUD_STORAGE}/${serviceId}`,
    {},
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
