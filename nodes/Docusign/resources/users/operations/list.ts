import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";

export const description: INodeProperties[] = [
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Additional Info",
        name: "additional_info",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Count",
        name: "count",
        type: "number",
        default: 100,
        typeOptions: {
          minValue: 1,
        },
      },
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: "",
      },
      {
        displayName: "Email Substring",
        name: "email_substring",
        type: "string",
        default: "",
      },
      {
        displayName: "Start Position",
        name: "start_position",
        type: "number",
        default: 0,
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        default: "active",
        options: [
          { name: "Active", value: "active" },
          { name: "Closed", value: "closed" },
          { name: "Created", value: "created" },
        ],
      },
      {
        displayName: "User Name Substring",
        name: "user_name_substring",
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
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const qs: IDataObject = {};

  const optionalParams = [
    "start_position",
    "count",
    "email",
    "email_substring",
    "status",
    "user_name_substring",
    "additional_info",
  ];

  optionalParams.forEach((param) => {
    if (additionalFields[param] !== undefined) {
      qs[param] = additionalFields[param];
    }
  });

  const response = await docusignApiRequest.call(
    this,
    "GET",
    "/users",
    {},
    qs,
  );

  return this.helpers.returnJsonArray(response.users || []);
}
