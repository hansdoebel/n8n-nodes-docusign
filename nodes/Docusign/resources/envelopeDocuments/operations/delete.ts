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
    description: "The ID of the envelope to delete documents from",
  },
  {
    displayName: "Document IDs",
    name: "documentIds",
    type: "string",
    required: true,
    default: "",
    description:
      "Comma-separated list of document IDs to delete from the envelope",
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const envelopeId = this.getNodeParameter("envelopeId", index) as string;
  const documentIds = this.getNodeParameter("documentIds", index) as string;

  const documents = documentIds
    .split(",")
    .map((id) => id.trim())
    .filter((id) => id)
    .map((id) => ({ documentId: id }));

  const body = { documents };

  const response = await docusignApiRequest.call(
    this,
    "DELETE",
    `/envelopes/${envelopeId}/documents`,
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
