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
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const envelopeId = this.getNodeParameter("envelopeId", index) as string;

  const response = await docusignApiRequest.call(
    this,
    "DELETE",
    `/envelopes/${envelopeId}`,
    {},
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
