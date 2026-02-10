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
    description: "The ID of the envelope to add or replace a document in",
  },
  {
    displayName: "Document ID",
    name: "documentId",
    type: "string",
    required: true,
    default: "1",
    description:
      "The ID of the document to replace, or a new ID to add a document",
  },
  {
    displayName: "Document Source",
    name: "documentSource",
    type: "options",
    required: true,
    default: "binaryData",
    options: [
      {
        name: "Binary Data",
        value: "binaryData",
      },
      {
        name: "URL",
        value: "url",
      },
    ],
  },
  {
    displayName: "Input Binary Field",
    name: "binaryPropertyName",
    type: "string",
    required: true,
    default: "data",
    description: "The name of the input binary field containing the document",
    displayOptions: {
      show: {
        documentSource: ["binaryData"],
      },
    },
  },
  {
    displayName: "Document URL",
    name: "documentUrl",
    type: "string",
    required: true,
    default: "",
    placeholder: "https://example.com/document.pdf",
    description: "The URL of the document to upload",
    displayOptions: {
      show: {
        documentSource: ["url"],
      },
    },
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const envelopeId = this.getNodeParameter("envelopeId", index) as string;
  const documentId = this.getNodeParameter("documentId", index) as string;
  const documentSource = this.getNodeParameter(
    "documentSource",
    index,
  ) as string;

  let documentBytes: Buffer;

  if (documentSource === "url") {
    const documentUrl = this.getNodeParameter("documentUrl", index) as string;
    const response = await this.helpers.httpRequest({
      url: documentUrl,
      method: "GET",
      encoding: "arraybuffer",
    });

    if (Buffer.isBuffer(response)) {
      documentBytes = response;
    } else if (typeof response === "string") {
      documentBytes = Buffer.from(response, "binary");
    } else {
      documentBytes = Buffer.from(response);
    }
  } else {
    const binaryPropertyName = this.getNodeParameter(
      "binaryPropertyName",
      index,
    ) as string;
    documentBytes = await this.helpers.getBinaryDataBuffer(
      index,
      binaryPropertyName,
    );
  }

  const response = await docusignApiRequest.call(
    this,
    "PUT",
    `/envelopes/${envelopeId}/documents/${documentId}`,
    documentBytes,
    {},
    {
      headers: {
        "Content-Type": "application/pdf",
      },
      json: false,
    },
  );

  const result = typeof response === "string" ? JSON.parse(response) : response;

  return this.helpers.returnJsonArray([result as IDataObject]);
}
