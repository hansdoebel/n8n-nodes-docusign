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
    description: "The ID of the envelope to list documents from",
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Include Document Size",
        name: "include_document_size",
        type: "boolean",
        default: false,
        description:
          "Whether to include the document size in the response",
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const envelopeId = this.getNodeParameter("envelopeId", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const qs: IDataObject = {};

  if (additionalFields.include_document_size !== undefined) {
    qs.include_document_size = additionalFields.include_document_size;
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    `/envelopes/${envelopeId}/documents`,
    {},
    qs,
  );

  const documents = (response as IDataObject).envelopeDocuments ?? [];

  return this.helpers.returnJsonArray(documents as IDataObject[]);
}
