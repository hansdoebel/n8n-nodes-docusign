import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";
import { API_ENDPOINTS } from "@utils/constants";

export const description: INodeProperties[] = [];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const response = await docusignApiRequest.call(
    this,
    "GET",
    API_ENDPOINTS.CONNECT,
    {},
  );

  return this.helpers.returnJsonArray(response.configurations || []);
}
