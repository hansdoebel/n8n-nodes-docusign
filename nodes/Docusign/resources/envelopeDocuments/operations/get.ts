import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";

export const description: INodeProperties[] = [
  {
    displayName: "Envelope ID",
    name: "envelopeId",
    type: "string",
    required: true,
    default: "",
    description: "The ID of the envelope to download documents from",
  },
  {
    displayName: "Document",
    name: "documentId",
    type: "options",
    required: true,
    default: "combined",
    description: "Which document to download",
    options: [
      {
        name: "Archive (ZIP)",
        value: "archive",
      },
      {
        name: "Certificate of Completion",
        value: "certificate",
      },
      {
        name: "Combined (All Documents)",
        value: "combined",
      },
      {
        name: "Portfolio (PDF Portfolio)",
        value: "portfolio",
      },
      {
        name: "Specific Document",
        value: "specific",
      },
    ],
  },
  {
    displayName: "Document ID",
    name: "specificDocumentId",
    type: "string",
    required: true,
    default: "1",
    description: "The numeric ID of the specific document to download",
    displayOptions: {
      show: {
        documentId: ["specific"],
      },
    },
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Include Certificate",
        name: "certificate",
        type: "boolean",
        default: false,
        description:
          "Whether to include the certificate of completion in the combined PDF. Only applies when downloading Combined documents.",
      },
      {
        displayName: "Language",
        name: "language",
        type: "options",
        default: "en",
        description:
          "The language for the Certificate of Completion",
        options: [
          { name: "Chinese Simplified", value: "zh_CN" },
          { name: "Chinese Traditional", value: "zh_TW" },
          { name: "Dutch", value: "nl" },
          { name: "English", value: "en" },
          { name: "French", value: "fr" },
          { name: "German", value: "de" },
          { name: "Italian", value: "it" },
          { name: "Japanese", value: "ja" },
          { name: "Korean", value: "ko" },
          { name: "Portuguese", value: "pt" },
          { name: "Portuguese (Brazil)", value: "pt_BR" },
          { name: "Russian", value: "ru" },
          { name: "Spanish", value: "es" },
        ],
      },
      {
        displayName: "Show Changes",
        name: "show_changes",
        type: "boolean",
        default: false,
        description:
          "Whether to highlight changed fields in yellow and optional signatures or initials outlined in red",
      },
      {
        displayName: "Watermark",
        name: "watermark",
        type: "boolean",
        default: false,
        description:
          "Whether to add the account watermark on the PDF documents",
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const envelopeId = this.getNodeParameter("envelopeId", index) as string;
  const documentId = this.getNodeParameter("documentId", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const resolvedDocumentId =
    documentId === "specific"
      ? (this.getNodeParameter("specificDocumentId", index) as string)
      : documentId;

  const qs: IDataObject = {};

  if (additionalFields.certificate !== undefined) {
    qs.certificate = additionalFields.certificate;
  }
  if (additionalFields.show_changes !== undefined) {
    qs.show_changes = additionalFields.show_changes;
  }
  if (additionalFields.watermark !== undefined) {
    qs.watermark = additionalFields.watermark;
  }
  if (additionalFields.language) {
    qs.language = additionalFields.language;
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    `/envelopes/${envelopeId}/documents/${resolvedDocumentId}`,
    {},
    qs,
    { encoding: null, json: false },
  );

  const isZip = documentId === "archive";
  const mimeType = isZip ? "application/zip" : "application/pdf";
  const fileExtension = isZip ? "zip" : "pdf";
  const fileName = `${envelopeId}_${resolvedDocumentId}.${fileExtension}`;

  const binaryData = await this.helpers.prepareBinaryData(
    Buffer.isBuffer(response) ? response : Buffer.from(response),
    fileName,
    mimeType,
  );

  return [
    {
      json: {
        envelopeId,
        documentId: resolvedDocumentId,
        fileName,
        mimeType,
      },
      binary: {
        data: binaryData,
      },
    },
  ];
}
