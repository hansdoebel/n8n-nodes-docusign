import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "../../../utils";
import { SHARED_TYPE_OPTIONS } from "../../../utils/constants";

export const description: INodeProperties[] = [
  {
    displayName: "Template ID",
    name: "templateId",
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
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
      },
      {
        displayName: "Email Message",
        name: "emailBlurb",
        type: "string",
        typeOptions: {
          rows: 4,
        },
        default: "",
      },
      {
        displayName: "Email Subject",
        name: "emailSubject",
        type: "string",
        default: "",
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: {
          password: true,
        },
        default: "",
      },
      {
        displayName: "Shared",
        name: "shared",
        type: "options",
        default: "false",
        options: SHARED_TYPE_OPTIONS,
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const templateId = this.getNodeParameter("templateId", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const body: IDataObject = {};

  const fields = [
    "name",
    "description",
    "emailSubject",
    "emailBlurb",
    "shared",
    "password",
  ];

  fields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      body[field] = additionalFields[field];
    }
  });

  const response = await docusignApiRequest.call(
    this,
    "PUT",
    `/templates/${templateId}`,
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
