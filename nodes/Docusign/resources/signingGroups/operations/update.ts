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
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Group Name",
        name: "groupName",
        type: "string",
        default: "",
      },
      {
        displayName: "Group Email",
        name: "groupEmail",
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
  const signingGroupId = this.getNodeParameter(
    "signingGroupId",
    index,
  ) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const body: IDataObject = {
    groups: [
      {
        groupId: signingGroupId,
      },
    ],
  };

  if (additionalFields.groupName) {
    (body.groups as IDataObject[])[0].groupName = additionalFields.groupName;
  }

  if (additionalFields.groupEmail) {
    (body.groups as IDataObject[])[0].groupEmail = additionalFields.groupEmail;
  }

  const response = await docusignApiRequest.call(
    this,
    "PUT",
    API_ENDPOINTS.SIGNING_GROUPS,
    body,
  );

  return this.helpers.returnJsonArray(response.groups || []);
}
