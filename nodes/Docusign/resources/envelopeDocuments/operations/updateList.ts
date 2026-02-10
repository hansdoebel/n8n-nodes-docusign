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
    description: "The ID of the envelope to add or replace documents in",
  },
  {
    displayName: "Documents",
    name: "documents",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    required: true,
    default: {},
    placeholder: "Add Document",
    options: [
      {
        displayName: "Document",
        name: "document",
        values: [
          {
            displayName: "Document ID",
            name: "documentId",
            type: "string",
            required: true,
            default: "1",
            description:
              "The ID for this document. Use an existing ID to replace, or a new ID to add.",
          },
          {
            displayName: "Name",
            name: "name",
            type: "string",
            required: true,
            default: "Document",
            description: "The name of the document",
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
            default: "data",
            description:
              "The name of the input binary field containing the document",
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
            default: "",
            placeholder: "https://example.com/document.pdf",
            description: "The URL of the document to upload",
            displayOptions: {
              show: {
                documentSource: ["url"],
              },
            },
          },
          {
            displayName: "File Extension",
            name: "fileExtension",
            type: "string",
            default: "pdf",
            description: "The file extension of the document",
          },
        ],
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const envelopeId = this.getNodeParameter("envelopeId", index) as string;
  const documentsData = this.getNodeParameter("documents", index) as IDataObject;

  const documentEntries = (documentsData.document as IDataObject[]) || [];

  const documents = [];

  for (const entry of documentEntries) {
    let documentBase64 = "";

    if (entry.documentSource === "url") {
      const response = await this.helpers.httpRequest({
        url: entry.documentUrl as string,
        method: "GET",
        encoding: "arraybuffer",
      });

      let buffer: Buffer;
      if (Buffer.isBuffer(response)) {
        buffer = response;
      } else if (typeof response === "string") {
        buffer = Buffer.from(response, "binary");
      } else {
        buffer = Buffer.from(response);
      }
      documentBase64 = buffer.toString("base64");
    } else {
      const binaryPropertyName =
        (entry.binaryPropertyName as string) || "data";
      const binaryData = await this.helpers.getBinaryDataBuffer(
        index,
        binaryPropertyName,
      );
      documentBase64 = binaryData.toString("base64");
    }

    documents.push({
      documentBase64,
      documentId: entry.documentId as string,
      name: entry.name as string,
      fileExtension: (entry.fileExtension as string) || "pdf",
    });
  }

  const body = { documents };

  const response = await docusignApiRequest.call(
    this,
    "PUT",
    `/envelopes/${envelopeId}/documents`,
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
