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
    description: "The ID of the envelope to get form data from",
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const envelopeId = this.getNodeParameter("envelopeId", index) as string;

  const response = await docusignApiRequest.call(
    this,
    "GET",
    `/envelopes/${envelopeId}/form_data`,
    {},
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
