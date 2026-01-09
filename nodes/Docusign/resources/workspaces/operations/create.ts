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
    displayName: "Workspace Name",
    name: "workspaceName",
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
        displayName: "Workspace Description",
        name: "workspaceDescription",
        type: "string",
        typeOptions: {
          rows: 4,
        },
        default: "",
      },
      {
        displayName: "Caller Information",
        name: "callerInformation",
        type: "string",
        default: "",
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceName = this.getNodeParameter("workspaceName", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const body: IDataObject = {
    workspaceName,
  };

  if (additionalFields.workspaceDescription) {
    body.workspaceDescription = additionalFields.workspaceDescription;
  }

  if (additionalFields.callerInformation) {
    body.callerInformation = additionalFields.callerInformation;
  }

  const response = await docusignApiRequest.call(
    this,
    "POST",
    API_ENDPOINTS.WORKSPACES,
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
