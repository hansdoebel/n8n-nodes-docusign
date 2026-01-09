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
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    default: "",
  },
  {
    displayName: "Envelope or Template ID",
    name: "envelopeOrTemplateId",
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
        displayName: "Email Message",
        name: "emailMessage",
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
        displayName: "Instructions",
        name: "instructions",
        type: "string",
        typeOptions: {
          rows: 4,
        },
        default: "",
      },
      {
        displayName: "Is Active",
        name: "isActive",
        type: "boolean",
        default: true,
      },
      {
        displayName: "Signing Mode",
        name: "signingMode",
        type: "options",
        default: "email",
        options: [
          { name: "Email", value: "email" },
          { name: "Direct", value: "direct" },
        ],
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const name = this.getNodeParameter("name", index) as string;
  const envelopeOrTemplateId = this.getNodeParameter(
    "envelopeOrTemplateId",
    index,
  ) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const body: IDataObject = {
    name,
    envelopeOrTemplateId,
  };

  const fields = [
    "emailSubject",
    "emailMessage",
    "instructions",
    "isActive",
    "signingMode",
  ];

  fields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      body[field] = additionalFields[field];
    }
  });

  const response = await docusignApiRequest.call(
    this,
    "POST",
    API_ENDPOINTS.POWER_FORMS,
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
