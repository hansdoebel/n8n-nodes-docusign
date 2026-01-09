import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";

export const description: INodeProperties[] = [
  {
    displayName: "Template ID",
    name: "templateId",
    type: "string",
    required: true,
    default: "",
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const templateId = this.getNodeParameter("templateId", index) as string;

  const response = await docusignApiRequest.call(
    this,
    "DELETE",
    `/templates/${templateId}`,
    {},
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
