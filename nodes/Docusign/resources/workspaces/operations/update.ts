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
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Workspace Name",
        name: "workspaceName",
        type: "string",
        default: "",
      },
      {
        displayName: "Workspace Description",
        name: "workspaceDescription",
        type: "string",
        typeOptions: {
          rows: 4,
        },
        default: "",
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        default: "active",
        options: [
          { name: "Active", value: "active" },
          { name: "Closed", value: "closed" },
        ],
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter("workspaceId", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const body: IDataObject = {};

  const fields = ["workspaceName", "workspaceDescription", "status"];

  fields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      body[field] = additionalFields[field];
    }
  });

  const response = await docusignApiRequest.call(
    this,
    "PUT",
    `${API_ENDPOINTS.WORKSPACES}/${workspaceId}`,
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
