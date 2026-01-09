import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "../../../utils";
import { ENVELOPE_STATUS_OPTIONS, EnvelopeStatus } from "../../../utils/constants";

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
        displayName: "Email Message",
        name: "emailBlurb",
        type: "string",
        typeOptions: {
          rows: 4,
        },
        default: "",
      },
      {
        displayName: "Email Subject",
        name: "emailSubject",
        type: "string",
        default: "",
      },
      {
        displayName: "Purge State",
        name: "purgeState",
        type: "options",
        default: "documents_queued",
        options: [
          { name: "Documents Queued", value: "documents_queued" },
          {
            name: "Documents and Metadata Queued",
            value: "documents_and_metadata_queued",
          },
        ],
      },
      {
        displayName: "Resend Envelope",
        name: "resend_envelope",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        default: "sent",
        options: ENVELOPE_STATUS_OPTIONS,
      },
      {
        displayName: "Voided Reason",
        name: "voidedReason",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            status: [EnvelopeStatus.VOIDED],
          },
        },
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

  const body: IDataObject = {};
  const qs: IDataObject = {};

  const bodyFields = [
    "emailSubject",
    "emailBlurb",
    "status",
    "voidedReason",
    "purgeState",
  ];

  bodyFields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      body[field] = additionalFields[field];
    }
  });

  if (additionalFields.resend_envelope !== undefined) {
    qs.resend_envelope = additionalFields.resend_envelope;
  }

  const response = await docusignApiRequest.call(
    this,
    "PUT",
    `/envelopes/${envelopeId}`,
    body,
    qs,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
