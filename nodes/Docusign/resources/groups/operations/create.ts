import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";

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
        displayName: "Group Type",
        name: "groupType",
        type: "options",
        default: "customGroup",
        options: [
          { name: "Admin Group", value: "adminGroup" },
          { name: "Custom Group", value: "customGroup" },
          { name: "Everyone Group", value: "everyoneGroup" },
        ],
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
        groupType: additionalFields.groupType || "customGroup",
      },
    ],
  };

  if (additionalFields.permissionProfileId) {
    (body.groups as IDataObject[])[0].permissionProfileId =
      additionalFields.permissionProfileId;
  }

  const response = await docusignApiRequest.call(
    this,
    "POST",
    "/groups",
    body,
  );

  return this.helpers.returnJsonArray(response.groups || []);
}
