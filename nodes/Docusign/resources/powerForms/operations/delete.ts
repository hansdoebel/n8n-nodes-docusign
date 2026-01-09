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
    displayName: "Power Form ID",
    name: "powerFormId",
    type: "string",
    required: true,
    default: "",
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const powerFormId = this.getNodeParameter("powerFormId", index) as string;

  const response = await docusignApiRequest.call(
    this,
    "DELETE",
    `${API_ENDPOINTS.POWER_FORMS}/${powerFormId}`,
    {},
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
