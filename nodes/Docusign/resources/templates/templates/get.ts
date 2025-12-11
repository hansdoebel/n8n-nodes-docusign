import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils/GenericFunctions";

export const templateGetDescription: INodeProperties[] = [
  {
    displayName: "Template ID",
    name: "templateId",
    type: "string",
    required: true,
    default: "",
    description: "The ID of the template to retrieve",
    displayOptions: {
      show: {
        resource: ["templates"],
        category: ["templates"],
        operation: ["get"],
      },
    },
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const templateId = this.getNodeParameter("templateId", index) as string;
  const endpoint = `/templates/${templateId}`;

  const response = await docusignApiRequest.call(this, "GET", endpoint, {});
  return this.helpers.returnJsonArray([response as IDataObject]);
}
