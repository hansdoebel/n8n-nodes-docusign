import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "../../../utils";

export const description: INodeProperties[] = [
  {
    displayName: "Envelope ID",
    name: "envelopeId",
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
        displayName: "Include",
        name: "include",
        type: "multiOptions",
        default: [],
        options: [
          { name: "Attachments", value: "attachments" },
          { name: "Custom Fields", value: "custom_fields" },
          { name: "Documents", value: "documents" },
          { name: "Extensions", value: "extensions" },
          { name: "Folders", value: "folders" },
          { name: "Payment Tabs", value: "payment_tabs" },
          { name: "PowerForm", value: "powerform" },
          { name: "Recipients", value: "recipients" },
          { name: "Tabs", value: "tabs" },
        ],
      },
      {
        displayName: "Advanced Update",
        name: "advanced_update",
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
  const envelopeId = this.getNodeParameter("envelopeId", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const qs: IDataObject = {};

  if (additionalFields.include && Array.isArray(additionalFields.include)) {
    qs.include = (additionalFields.include as string[]).join(",");
  }

  if (additionalFields.advanced_update !== undefined) {
    qs.advanced_update = additionalFields.advanced_update;
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    `/envelopes/${envelopeId}`,
    {},
    qs,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
