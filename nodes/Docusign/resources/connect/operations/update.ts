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
    displayName: "Connect ID",
    name: "connectId",
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
        displayName: "Allow Envelope Publish",
        name: "allowEnvelopePublish",
        type: "boolean",
        default: true,
      },
      {
        displayName: "Enable Log",
        name: "enableLog",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Include Certificate of Completion",
        name: "includeCertificateOfCompletion",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Include Documents",
        name: "includeDocuments",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
      },
      {
        displayName: "URL to Publish",
        name: "urlToPublishTo",
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
  const connectId = this.getNodeParameter("connectId", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const body: IDataObject = {};

  const fields = [
    "urlToPublishTo",
    "name",
    "allowEnvelopePublish",
    "enableLog",
    "includeCertificateOfCompletion",
    "includeDocuments",
  ];

  fields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      body[field] = additionalFields[field];
    }
  });

  const response = await docusignApiRequest.call(
    this,
    "PUT",
    `${API_ENDPOINTS.CONNECT}/${connectId}`,
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
