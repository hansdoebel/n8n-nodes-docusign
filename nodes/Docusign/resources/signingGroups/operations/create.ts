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
    displayName: "Group Name",
    name: "groupName",
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
        displayName: "Group Email",
        name: "groupEmail",
        type: "string",
        default: "",
      },
      {
        displayName: "Group Type",
        name: "groupType",
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
  const groupName = this.getNodeParameter("groupName", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const body: IDataObject = {
    groups: [
      {
        groupName,
      },
    ],
  };

  if (additionalFields.groupEmail) {
    (body.groups as IDataObject[])[0].groupEmail = additionalFields.groupEmail;
  }

  if (additionalFields.groupType) {
    (body.groups as IDataObject[])[0].groupType = additionalFields.groupType;
  }

  const response = await docusignApiRequest.call(
    this,
    "POST",
    API_ENDPOINTS.SIGNING_GROUPS,
    body,
  );

  return this.helpers.returnJsonArray(response.groups || []);
}
