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
    displayName: "Request Log ID",
    name: "requestLogId",
    type: "string",
    required: true,
    default: "",
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const requestLogId = this.getNodeParameter("requestLogId", index) as string;

  const response = await docusignApiRequest.call(
    this,
    "GET",
    `${API_ENDPOINTS.DIAGNOSTICS}/${requestLogId}`,
    {},
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
