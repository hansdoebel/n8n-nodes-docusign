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
    displayName: "URL to Publish",
    name: "urlToPublishTo",
    type: "string",
    required: true,
    default: "",
  },
  {
    displayName: "Name",
    name: "name",
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
        displayName: "Include Document Fields",
        name: "includeDocumentFields",
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
        displayName: "Include Envelope Void Reason",
        name: "includeEnvelopeVoidReason",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Include Sender Account as Custom Field",
        name: "includeSenderAccountAsCustomField",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Include Time Zone",
        name: "includeTimeZone",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Require Acknowledgement",
        name: "requiresAcknowledgement",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Use SOAP Interface",
        name: "useSoapInterface",
        type: "boolean",
        default: false,
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const urlToPublishTo = this.getNodeParameter(
    "urlToPublishTo",
    index,
  ) as string;
  const name = this.getNodeParameter("name", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const body: IDataObject = {
    urlToPublishTo,
    name,
  };

  const fields = [
    "allowEnvelopePublish",
    "enableLog",
    "includeCertificateOfCompletion",
    "includeDocumentFields",
    "includeDocuments",
    "includeEnvelopeVoidReason",
    "includeSenderAccountAsCustomField",
    "includeTimeZone",
    "requiresAcknowledgement",
    "useSoapInterface",
  ];

  fields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      body[field] = additionalFields[field];
    }
  });

  const response = await docusignApiRequest.call(
    this,
    "POST",
    API_ENDPOINTS.CONNECT,
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
