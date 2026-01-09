import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "../../../utils";
import {
  DocumentSourceType,
  SHARED_TYPE_OPTIONS,
  SIGNING_LOCATION_OPTIONS,
  TEMPLATE_STATUS_OPTIONS,
} from "../../../utils/constants";

export const description: INodeProperties[] = [
  {
    displayName: "Template Name",
    name: "templateName",
    type: "string",
    required: true,
    default: "",
  },
  {
    displayName: "Document Source",
    name: "documentSource",
    type: "options",
    required: true,
    default: "url",
    options: [
      { name: "Upload File", value: DocumentSourceType.UPLOAD },
      { name: "URL", value: DocumentSourceType.URL },
    ],
  },
  {
    displayName: "Document File",
    name: "documentFile",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        documentSource: [DocumentSourceType.UPLOAD],
      },
    },
  },
  {
    displayName: "Document URL",
    name: "documentUrl",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        documentSource: [DocumentSourceType.URL],
      },
    },
  },
  {
    displayName: "Recipients",
    name: "recipients",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    placeholder: "Add Recipient",
    options: [
      {
        name: "signers",
        displayName: "Signers",
        values: [
          {
            displayName: "Role Name",
            name: "roleName",
            type: "string",
            required: true,
            default: "",
          },
          {
            displayName: "Recipient ID",
            name: "recipientId",
            type: "string",
            required: true,
            default: "1",
          },
          {
            displayName: "Routing Order",
            name: "routingOrder",
            type: "string",
            default: "1",
          },
        ],
      },
      {
        name: "carbonCopies",
        displayName: "Carbon Copies",
        values: [
          {
            displayName: "Role Name",
            name: "roleName",
            type: "string",
            required: true,
            default: "",
          },
          {
            displayName: "Recipient ID",
            name: "recipientId",
            type: "string",
            required: true,
            default: "1",
          },
          {
            displayName: "Routing Order",
            name: "routingOrder",
            type: "string",
            default: "1",
          },
        ],
      },
    ],
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Allow Markup",
        name: "allowMarkup",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Allow Reassign",
        name: "allowReassign",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
      },
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
        displayName: "Enable Wet Sign",
        name: "enableWetSign",
        type: "boolean",
        default: true,
      },
      {
        displayName: "Enforce Signer Visibility",
        name: "enforceSignerVisibility",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Folder ID",
        name: "folderId",
        type: "string",
        default: "",
      },
      {
        displayName: "Folder Name",
        name: "folderName",
        type: "string",
        default: "",
      },
      {
        displayName: "Shared",
        name: "shared",
        type: "options",
        default: "false",
        options: SHARED_TYPE_OPTIONS,
      },
      {
        displayName: "Signing Location",
        name: "signingLocation",
        type: "options",
        default: "online",
        options: SIGNING_LOCATION_OPTIONS,
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        default: "active",
        options: TEMPLATE_STATUS_OPTIONS,
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const templateName = this.getNodeParameter("templateName", index) as string;
  const documentSource = this.getNodeParameter(
    "documentSource",
    index,
  ) as DocumentSourceType;
  const recipientsData = this.getNodeParameter(
    "recipients",
    index,
    {},
  ) as IDataObject;
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
  if (recipientsData.signers) {
    recipients.signers = recipientsData.signers;
  }
  if (recipientsData.carbonCopies) {
    recipients.carbonCopies = recipientsData.carbonCopies;
  }

  const envelopeTemplateDefinition: IDataObject = {
    name: templateName,
    shared: additionalFields.shared ?? "false",
    status: additionalFields.status ?? "active",
  };

  const optionalDefFields = [
    "description",
    "signingLocation",
    "enableWetSign",
    "allowMarkup",
    "allowReassign",
    "enforceSignerVisibility",
    "folderId",
    "folderName",
  ];

  optionalDefFields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      envelopeTemplateDefinition[field] = additionalFields[field];
    }
  });

  if (Object.keys(recipients).length > 0) {
    envelopeTemplateDefinition.recipients = recipients;
  }

  const body: IDataObject = {
    envelopeTemplateDefinition,
    documents,
  };

  if (additionalFields.emailSubject) {
    body.emailSubject = additionalFields.emailSubject;
  }

  if (additionalFields.emailBlurb) {
    body.emailBlurb = additionalFields.emailBlurb;
  }

  const response = await docusignApiRequest.call(
    this,
    "POST",
    "/templates",
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
