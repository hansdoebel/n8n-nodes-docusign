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
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Company",
        name: "company",
        type: "string",
        default: "",
      },
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: "",
      },
      {
        displayName: "First Name",
        name: "firstName",
        type: "string",
        default: "",
      },
      {
        displayName: "Job Title",
        name: "jobTitle",
        type: "string",
        default: "",
      },
      {
        displayName: "Last Name",
        name: "lastName",
        type: "string",
        default: "",
      },
      {
        displayName: "Middle Name",
        name: "middleName",
        type: "string",
        default: "",
      },
      {
        displayName: "Permission Profile ID",
        name: "permissionProfileId",
        type: "string",
        default: "",
      },
      {
        displayName: "Suffix Name",
        name: "suffixName",
        type: "string",
        default: "",
      },
      {
        displayName: "User Name",
        name: "userName",
        type: "string",
        default: "",
      },
      {
        displayName: "User Status",
        name: "userStatus",
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
  const userId = this.getNodeParameter("userId", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const user: IDataObject = {
    userId,
  };

  const fields = [
    "email",
    "userName",
    "firstName",
    "lastName",
    "middleName",
    "suffixName",
    "jobTitle",
    "company",
    "permissionProfileId",
    "userStatus",
  ];

  fields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      user[field] = additionalFields[field];
    }
  });

  const body: IDataObject = {
    users: [user],
  };

  const response = await docusignApiRequest.call(
    this,
    "PUT",
    "/users",
    body,
  );

  return this.helpers.returnJsonArray(response.users || []);
}
