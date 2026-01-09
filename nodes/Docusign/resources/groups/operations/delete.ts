import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";

export const description: INodeProperties[] = [
  {
    displayName: "Group ID",
    name: "groupId",
    type: "string",
    required: true,
    default: "",
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const groupId = this.getNodeParameter("groupId", index) as string;

  const body: IDataObject = {
    groups: [
      {
        groupId,
      },
    ],
  };

  const response = await docusignApiRequest.call(
    this,
    "DELETE",
    "/groups",
    body,
  );

  return this.helpers.returnJsonArray(response.groups || []);
}
