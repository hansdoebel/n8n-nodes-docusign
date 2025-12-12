import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils/GenericFunctions";

export const templateListDescription: INodeProperties[] = [
  {
    displayName: "Template ID",
    name: "templateId",
    type: "string",
    default: "",
    description: "The ID of the template to retrieve",
    displayOptions: {
      show: {
        resource: ["templates"],
        category: ["templates"],
        operation: ["list"],
      },
    },
    {
      displayName: "Additional Fields",
      name: "additionalFields",
      type: "collection",
      placeholder: "Add field",
      default: {},
      displayOptions: {
        show: {
          resource: ["templates"],
          category: ["templates"],
          operation: ["list"],
        },
      },
      options: [
        {
          displayName: "Count",
          name: "count",
          type: "string",
          default: "",
          description:
            "The maximum number of results to return",
        },
      ] as INodeProperties[],
    },
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const templateId = this.getNodeParameter("templateId", index) as string;
  const endpoint = `/templates`;

  const response = await docusignApiRequest.call(this, "GET", endpoint, {});
  return this.helpers.returnJsonArray([response as IDataObject]);
}
