import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";

export const description: INodeProperties[] = [
  {
    displayName: "User ID",
    name: "userId",
    type: "string",
    required: true,
    default: "",
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const userId = this.getNodeParameter("userId", index) as string;

  const body: IDataObject = {
    users: [
      {
        userId,
      },
    ],
  };

  const response = await docusignApiRequest.call(
    this,
    "DELETE",
    "/users",
    body,
  );

  return this.helpers.returnJsonArray(response.users || []);
}
