import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils/GenericFunctions";

enum TemplateStatus {
  DRAFT = "draft",
  ACTIVE = "active",
}

enum SharedType {
  NOTSHARED = "false",
  SHARED = "true",
}

enum SigningLocation {
  INBOX = "inbox",
  ONLINE = "online",
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

const TEMPLATE_STATUS_OPTIONS = [
  { name: "Draft", value: TemplateStatus.DRAFT },
  { name: "Active", value: TemplateStatus.ACTIVE },
];

const SHARED_TYPE_OPTIONS = [
  { name: "Not Shared", value: SharedType.NOTSHARED },
  { name: "Shared", value: SharedType.SHARED },
];

const SIGNING_LOCATION_OPTIONS = [
  { name: "Inbox", value: SigningLocation.INBOX },
  { name: "Online", value: SigningLocation.ONLINE },
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

enum DocumentSourceType {
  UPLOAD = "upload",
  URL = "url",
}

const DOCUMENT_SOURCE_OPTIONS = [
  { name: "Upload File", value: DocumentSourceType.UPLOAD },
  { name: "URL", value: DocumentSourceType.URL },
];

export const templateCreateDescription: INodeProperties[] = [
  {
    displayName: "Template Name",
    name: "templateName",
    type: "string",
    required: true,
    default: "",
    description: "The name of the template",
    displayOptions: {
      show: {
        resource: ["templates"],
        category: ["templates"],
        operation: ["create"],
      },
    },
  },
  {
    displayName: "Description",
    name: "templateDescription",
    type: "string",
    required: false,
    default: "",
    description: "The description of the template",
    displayOptions: {
      show: {
        resource: ["templates"],
        category: ["templates"],
        operation: ["create"],
      },
    },
  },
  {
    displayName: "Document Source",
    name: "documentSource",
    type: "options",
    default: DocumentSourceType.UPLOAD,
    options: DOCUMENT_SOURCE_OPTIONS,
    description: "Choose whether to upload a file or use a URL",
    displayOptions: {
      show: {
        resource: ["templates"],
        category: ["templates"],
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
        resource: ["templates"],
        category: ["templates"],
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
        resource: ["templates"],
        category: ["templates"],
        operation: ["create"],
        documentSource: ["url"],
      },
    },
  },
  {
    displayName: "Email Subject",
    name: "emailSubject",
    type: "string",
    required: false,
    default: "",
    description: "The subject line for the email sent when template is used",
    displayOptions: {
      show: {
        resource: ["templates"],
        category: ["templates"],
        operation: ["create"],
      },
    },
  },
  {
    displayName: "Email Message",
    name: "emailMessage",
    type: "string",
    required: false,
    default: "",
    description: "The email message that will be sent with the template",
    typeOptions: {
      rows: 4,
    },
    displayOptions: {
      show: {
        resource: ["templates"],
        category: ["templates"],
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
    required: false,
    default: {},
    placeholder: "Add recipient",
    displayOptions: {
      show: {
        resource: ["templates"],
        category: ["templates"],
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
        displayName: "Role Name",
        name: "roleName",
        type: "string",
        default: "",
        description: "The role name for this recipient (e.g., signer, cc)",
      },
      {
        displayName: "Recipient ID",
        name: "recipientId",
        type: "string",
        default: "",
        description: "The unique recipient ID",
      },
      {
        displayName: "Routing Order",
        name: "routingOrder",
        type: "number",
        default: 1,
        description: "The order in which recipients receive the template",
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
        resource: ["templates"],
        category: ["templates"],
        operation: ["create"],
      },
    },
    options: [
      {
        displayName: "Shared",
        name: "shared",
        type: "options",
        default: SharedType.NOTSHARED,
        options: SHARED_TYPE_OPTIONS,
        description:
          "Indicates whether the template is shared with other accounts",
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        default: TemplateStatus.ACTIVE,
        options: TEMPLATE_STATUS_OPTIONS,
        description: "The status of the template",
      },
      {
        displayName: "Signing Location",
        name: "signingLocation",
        type: "options",
        default: SigningLocation.INBOX,
        options: SIGNING_LOCATION_OPTIONS,
        description: "The location where signers sign the documents",
      },
      {
        displayName: "Enable Wet Sign",
        name: "enableWetSign",
        type: "boolean",
        default: true,
        description: "Whether signers are allowed to sign with wet signatures",
      },
      {
        displayName: "Allow Markup",
        name: "allowMarkup",
        type: "boolean",
        default: false,
        description: "Whether signers are allowed to mark up documents",
      },
      {
        displayName: "Allow Reassign",
        name: "allowReassign",
        type: "boolean",
        default: false,
        description:
          "Whether signers are allowed to reassign the template to others",
      },
      {
        displayName: "Enforce Signer Visibility",
        name: "enforceSignerVisibility",
        type: "boolean",
        default: false,
        description:
          "Whether signers can only view documents they are assigned to sign",
      },
      {
        displayName: "Folder ID",
        name: "folderId",
        type: "string",
        default: "",
        description: "The folder ID where the template will be stored",
      },
      {
        displayName: "Folder Name",
        name: "folderName",
        type: "string",
        default: "",
        description: "The folder name where the template will be stored",
      },
    ] as INodeProperties[],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const templateName = this.getNodeParameter("templateName", index) as string;
  const templateDescription = this.getNodeParameter(
    "templateDescription",
    index,
    "",
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
  const documentSource = this.getNodeParameter(
    "documentSource",
    index,
    DocumentSourceType.UPLOAD,
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
        roleName: recipient.roleName || "",
        recipientId: recipient.recipientId || "",
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

    if (signers.length > 0) {
      recipients.signers = signers;
    }
    if (carbonCopies.length > 0) {
      recipients.carbonCopies = carbonCopies;
    }
    if (agents.length > 0) {
      recipients.agents = agents;
    }
    if (editors.length > 0) {
      recipients.editors = editors;
    }
    if (intermediaries.length > 0) {
      recipients.intermediaries = intermediaries;
    }
    if (certifiedDeliveries.length > 0) {
      recipients.certifiedDeliveries = certifiedDeliveries;
    }
    if (inPersonSigners.length > 0) {
      recipients.inPersonSigners = inPersonSigners;
    }
  }

  const envelopeTemplateDefinition: IDataObject = {
    name: templateName,
    description: templateDescription,
    shared: additionalFields.shared ?? SharedType.NOTSHARED,
    status: additionalFields.status ?? TemplateStatus.ACTIVE,
    signingLocation: additionalFields.signingLocation || SigningLocation.INBOX,
  };

  if (additionalFields.enableWetSign !== undefined) {
    envelopeTemplateDefinition.enableWetSign = additionalFields.enableWetSign;
  }

  if (additionalFields.allowMarkup !== undefined) {
    envelopeTemplateDefinition.allowMarkup = additionalFields.allowMarkup;
  }

  if (additionalFields.allowReassign !== undefined) {
    envelopeTemplateDefinition.allowReassign = additionalFields.allowReassign;
  }

  if (additionalFields.enforceSignerVisibility !== undefined) {
    envelopeTemplateDefinition.enforceSignerVisibility =
      additionalFields.enforceSignerVisibility;
  }

  if (additionalFields.folderId) {
    envelopeTemplateDefinition.folderId = additionalFields.folderId;
  }

  if (additionalFields.folderName) {
    envelopeTemplateDefinition.folderName = additionalFields.folderName;
  }

  if (Object.keys(recipients).length > 0) {
    envelopeTemplateDefinition.recipients = recipients;
  }

  const body: IDataObject = {
    envelopeTemplateDefinition,
    documents,
  };

  if (emailSubject) {
    body.emailSubject = emailSubject;
  }

  if (emailMessage) {
    body.emailBlurb = emailMessage;
  }

  const endpoint = "/templates";

  const response = await docusignApiRequest.call(
    this,
    "POST",
    endpoint,
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
