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
    displayName: "Workspace ID",
    name: "workspaceId",
    type: "string",
    required: true,
    default: "",
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter("workspaceId", index) as string;

  const response = await docusignApiRequest.call(
    this,
    "GET",
    `${API_ENDPOINTS.WORKSPACES}/${workspaceId}`,
    {},
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
