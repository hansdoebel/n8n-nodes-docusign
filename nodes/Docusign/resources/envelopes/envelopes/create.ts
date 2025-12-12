/* eslint-disable n8n-nodes-base/node-param-default-missing */
import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils/GenericFunctions";

enum EnvelopeStatus {
  CREATED = "created",
  SENT = "sent",
  VOIDED = "voided",
}

enum RecipientType {
  SIGNER = "signer",
  CC = "carbonCopy",
  AGENT = "agent",
  EDITOR = "editor",
  INTERMEDIARY = "intermediary",
  CERTIFIED_DELIVERY = "certifiedDelivery",
  IN_PERSON_SIGNER = "inPersonSigner",
}

enum DocumentSourceType {
  UPLOAD = "upload",
  URL = "url",
}

const ENVELOPE_STATUS_OPTIONS = [
  { name: "Created", value: EnvelopeStatus.CREATED },
  { name: "Sent", value: EnvelopeStatus.SENT },
  { name: "Voided", value: EnvelopeStatus.VOIDED },
];

const RECIPIENT_TYPE_OPTIONS = [
  { name: "Signer", value: RecipientType.SIGNER },
  { name: "Carbon Copy", value: RecipientType.CC },
  { name: "Agent", value: RecipientType.AGENT },
  { name: "Editor", value: RecipientType.EDITOR },
  { name: "Intermediary", value: RecipientType.INTERMEDIARY },
  { name: "Certified Delivery", value: RecipientType.CERTIFIED_DELIVERY },
  { name: "In Person Signer", value: RecipientType.IN_PERSON_SIGNER },
];

const DOCUMENT_SOURCE_OPTIONS = [
  { name: "Upload File", value: DocumentSourceType.UPLOAD },
  { name: "URL", value: DocumentSourceType.URL },
];

export const envelopeCreateDescription: INodeProperties[] = [
  {
    displayName: "Document Source",
    name: "documentSource",
    type: "options",
    default: DocumentSourceType.UPLOAD,
    options: DOCUMENT_SOURCE_OPTIONS,
    description: "Choose whether to upload a file or use a URL",
    displayOptions: {
      show: {
        resource: ["envelopes"],
        category: ["envelopes"],
        operation: ["create"],
      },
    },
  },
  {
    displayName: "Document File",
    name: "documentFile",
    type: "string",
    required: true,
    default: "",
    description: "The document file to upload (binary data)",
    displayOptions: {
      show: {
        resource: ["envelopes"],
        category: ["envelopes"],
        operation: ["create"],
        documentSource: ["upload"],
      },
    },
  },
  {
    displayName: "Document URL",
    name: "documentUrl",
    type: "string",
    required: true,
    default: "",
    description:
      "The URL of the document to use (e.g., https://example.com/document.pdf)",
    displayOptions: {
      show: {
        resource: ["envelopes"],
        category: ["envelopes"],
        operation: ["create"],
        documentSource: ["url"],
      },
    },
  },
  {
    displayName: "Email Subject",
    name: "emailSubject",
    type: "string",
    default: "",
    description: "The subject line for the email sent with the envelope",
    displayOptions: {
      show: {
        resource: ["envelopes"],
        category: ["envelopes"],
        operation: ["create"],
      },
    },
  },
  {
    displayName: "Email Message",
    name: "emailMessage",
    type: "string",
    description: "The email message that will be sent with the envelope",
    typeOptions: {
      rows: 4,
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["envelopes"],
        category: ["envelopes"],
        operation: ["create"],
      },
    },
  },
  {
    displayName: "Recipients",
    name: "recipients",
    type: "collection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    placeholder: "Add recipient",
    displayOptions: {
      show: {
        resource: ["envelopes"],
        category: ["envelopes"],
        operation: ["create"],
      },
    },
    options: [
      {
        displayName: "Recipient Type",
        name: "recipientType",
        type: "options",
        default: RecipientType.SIGNER,
        options: RECIPIENT_TYPE_OPTIONS,
        description: "The type of recipient",
      },
      {
        displayName: "Email",
        name: "email",
        type: "string",
        default: "",
        description: "The email address of the recipient",
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "The name of the recipient",
      },
      {
        displayName: "Routing Order",
        name: "routingOrder",
        type: "number",
        default: 1,
        description: "The order in which recipients receive the envelope",
      },
    ],
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add field",
    default: {},
    displayOptions: {
      show: {
        resource: ["envelopes"],
        category: ["envelopes"],
        operation: ["create"],
      },
    },
    options: [
      {
        displayName: "Status",
        name: "status",
        type: "options",
        default: EnvelopeStatus.SENT,
        options: ENVELOPE_STATUS_OPTIONS,
        description: "The status of the envelope",
      },
      {
        displayName: "Change Routing Order",
        name: "changeRoutingOrder",
        type: "boolean",
        default: false,
        description:
          "When true, users can define the routing order of recipients while sending documents for signature",
      },
      {
        displayName: "Merge Roles on Draft",
        name: "mergeRolesOnDraft",
        type: "boolean",
        default: false,
        description:
          "When true, template roles will be merged, and empty recipients will be removed",
      },
    ] as INodeProperties[],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  // const useDefaultAccount = this.getNodeParameter(
  //   "useDefaultAccount",
  //   index,
  // ) as boolean;
  const documentSource = this.getNodeParameter(
    "documentSource",
    index,
    DocumentSourceType.UPLOAD,
  ) as string;
  const emailSubject = this.getNodeParameter(
    "emailSubject",
    index,
    "",
  ) as string;
  const emailMessage = this.getNodeParameter(
    "emailMessage",
    index,
    "",
  ) as string;
  const recipientsData = this.getNodeParameter(
    "recipients",
    index,
    [],
  ) as IDataObject[];
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  // let accountId: string;
  // if (!useDefaultAccount) {
  //   accountId = this.getNodeParameter("accountId", index) as string;
  // } else {
  //   const credentials = await this.getCredentials("docusignOAuth2Api");
  //   accountId = credentials.defaultAccountId as string;
  // }

  let documentBase64 = "";
  let documentName = "Document";
  let fileExtension = "pdf";

  if (documentSource === DocumentSourceType.URL) {
    const documentUrl = this.getNodeParameter("documentUrl", index) as string;

    const response = await this.helpers.httpRequest({
      url: documentUrl,
      method: "GET",
      encoding: "arraybuffer",
    });

    let buffer: Buffer;
    if (response instanceof Buffer) {
      buffer = response;
    } else if (typeof response === "string") {
      buffer = Buffer.from(response, "binary");
    } else {
      buffer = Buffer.from(response);
    }
    documentBase64 = buffer.toString("base64");

    const urlParts = documentUrl.split("/");
    const fileName = urlParts[urlParts.length - 1];
    documentName = fileName.split("?")[0];

    const nameParts = documentName.split(".");
    if (nameParts.length > 1) {
      fileExtension = nameParts[nameParts.length - 1].toLowerCase();
    }
  } else {
    const documentFile = this.getNodeParameter(
      "documentFile",
      index,
    ) as IDataObject;

    if (documentFile && typeof documentFile === "object") {
      const fileData = documentFile.data;
      if (typeof fileData === "string") {
        documentBase64 = fileData;
      }
      if (documentFile.fileName) {
        documentName = documentFile.fileName as string;
        const nameParts = documentName.split(".");
        if (nameParts.length > 1) {
          fileExtension = nameParts[nameParts.length - 1];
        }
      }
    }
  }

  const documents = [
    {
      documentBase64,
      name: documentName,
      fileExtension,
      documentId: "1",
    },
  ];

  const recipients: IDataObject = {};

  if (recipientsData && recipientsData.length > 0) {
    const signers = [];
    const carbonCopies = [];
    const agents = [];
    const editors = [];
    const intermediaries = [];
    const certifiedDeliveries = [];
    const inPersonSigners = [];

    for (const recipient of recipientsData) {
      const recipientObj = {
        email: recipient.email || "",
        name: recipient.name || "",
        routingOrder: recipient.routingOrder || "1",
      };

      switch (recipient.recipientType) {
        case RecipientType.SIGNER:
          signers.push(recipientObj);
          break;
        case RecipientType.CC:
          carbonCopies.push(recipientObj);
          break;
        case RecipientType.AGENT:
          agents.push(recipientObj);
          break;
        case RecipientType.EDITOR:
          editors.push(recipientObj);
          break;
        case RecipientType.INTERMEDIARY:
          intermediaries.push(recipientObj);
          break;
        case RecipientType.CERTIFIED_DELIVERY:
          certifiedDeliveries.push(recipientObj);
          break;
        case RecipientType.IN_PERSON_SIGNER:
          inPersonSigners.push(recipientObj);
          break;
      }
    }

    if (signers.length > 0) recipients.signers = signers;
    if (carbonCopies.length > 0) recipients.carbonCopies = carbonCopies;
    if (agents.length > 0) recipients.agents = agents;
    if (editors.length > 0) recipients.editors = editors;
    if (intermediaries.length > 0) recipients.intermediaries = intermediaries;
    if (certifiedDeliveries.length > 0) {
      recipients.certifiedDeliveries = certifiedDeliveries;
    }
    if (inPersonSigners.length > 0) {
      recipients.inPersonSigners = inPersonSigners;
    }
  }

  const body: IDataObject = {
    documents,
  };

  if (Object.keys(recipients).length > 0) {
    body.recipients = recipients;
  }

  // Additional query parameters
  const queryParams: IDataObject = {};
  if (additionalFields.changeRoutingOrder !== undefined) {
    queryParams.change_routing_order = additionalFields.changeRoutingOrder;
  }
  if (additionalFields.mergeRolesOnDraft !== undefined) {
    queryParams.merge_roles_on_draft = additionalFields.mergeRolesOnDraft;
  }

  // Envelope status
  body.status = additionalFields.status ?? EnvelopeStatus.SENT;

  if (emailSubject) {
    body.emailSubject = emailSubject;
  }

  if (emailMessage) {
    body.emailBlurb = emailMessage;
  }

  const endpoint = `/envelopes`;

  const response = await docusignApiRequest.call(
    this,
    "POST",
    endpoint,
    body,
    queryParams,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
