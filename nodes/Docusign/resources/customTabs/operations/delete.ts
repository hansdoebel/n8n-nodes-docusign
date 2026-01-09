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
    displayName: "Custom Tab ID",
    name: "customTabId",
    type: "string",
    required: true,
    default: "",
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const customTabId = this.getNodeParameter("customTabId", index) as string;

  const response = await docusignApiRequest.call(
    this,
    "DELETE",
    `${API_ENDPOINTS.CUSTOM_TABS}/${customTabId}`,
    {},
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
