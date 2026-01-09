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
    displayName: "Signing Group ID",
    name: "signingGroupId",
    type: "string",
    required: true,
    default: "",
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const signingGroupId = this.getNodeParameter(
    "signingGroupId",
    index,
  ) as string;

  const response = await docusignApiRequest.call(
    this,
    "GET",
    `${API_ENDPOINTS.SIGNING_GROUPS}/${signingGroupId}`,
    {},
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
