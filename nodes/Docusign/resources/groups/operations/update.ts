import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "../../../utils";

export const description: INodeProperties[] = [
  {
    displayName: "Group ID",
    name: "groupId",
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
        displayName: "Permission Profile ID",
        name: "permissionProfileId",
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
  const groupId = this.getNodeParameter("groupId", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const body: IDataObject = {
    groups: [
      {
        groupId,
      },
    ],
  };

  if (additionalFields.groupName) {
    (body.groups as IDataObject[])[0].groupName = additionalFields.groupName;
  }

  if (additionalFields.permissionProfileId) {
    (body.groups as IDataObject[])[0].permissionProfileId =
      additionalFields.permissionProfileId;
  }

  const response = await docusignApiRequest.call(
    this,
    "PUT",
    "/groups",
    body,
  );

  return this.helpers.returnJsonArray(response.groups || []);
}
