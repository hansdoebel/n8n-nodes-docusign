import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "../../../utils";

export const description: INodeProperties[] = [
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    required: true,
    default: "",
  },
  {
    displayName: "User Name",
    name: "userName",
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
        displayName: "Activation Access Code",
        name: "activationAccessCode",
        type: "string",
        default: "",
      },
      {
        displayName: "Company",
        name: "company",
        type: "string",
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
        displayName: "Send Activation Email",
        name: "sendActivationEmail",
        type: "boolean",
        default: true,
      },
      {
        displayName: "Suffix Name",
        name: "suffixName",
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
  const email = this.getNodeParameter("email", index) as string;
  const userName = this.getNodeParameter("userName", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const user: IDataObject = {
    email,
    userName,
  };

  const fields = [
    "firstName",
    "lastName",
    "middleName",
    "suffixName",
    "jobTitle",
    "company",
    "permissionProfileId",
    "sendActivationEmail",
    "activationAccessCode",
  ];

  fields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      user[field] = additionalFields[field];
    }
  });

  const body: IDataObject = {
    newUsers: [user],
  };

  const response = await docusignApiRequest.call(
    this,
    "POST",
    "/users",
    body,
  );

  return this.helpers.returnJsonArray(response.newUsers || []);
}
