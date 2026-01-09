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
    displayName: "Organization ID",
    name: "organizationId",
    type: "string",
    required: true,
    default: "",
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const organizationId = this.getNodeParameter(
    "organizationId",
    index,
  ) as string;

  const response = await docusignApiRequest.call(
    this,
    "GET",
    `${API_ENDPOINTS.ORGANIZATIONS}/${organizationId}`,
    {},
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
