import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";
import {
  DOCUMENT_SOURCE_OPTIONS,
  DocumentSourceType,
  ENVELOPE_STATUS_OPTIONS,
  EnvelopeStatus,
} from "@utils/constants";

export const description: INodeProperties[] = [
  {
    displayName: "Email Subject",
    name: "emailSubject",
    type: "string",
    required: true,
    default: "",
    description: "The subject line for the email sent with the envelope",
  },
  {
    displayName: "Document Source",
    name: "documentSource",
    type: "options",
    required: true,
    default: "upload",
    options: DOCUMENT_SOURCE_OPTIONS,
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
    displayName: "Template ID",
    name: "templateId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        documentSource: [DocumentSourceType.TEMPLATE],
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
            displayName: "Email",
            name: "email",
            type: "string",
            placeholder: "name@email.com",
            required: true,
            default: "",
          },
          {
            displayName: "Name",
            name: "name",
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
            type: "number",
            default: 1,
          },
        ],
      },
      {
        name: "carbonCopies",
        displayName: "Carbon Copies",
        values: [
          {
            displayName: "Email",
            name: "email",
            type: "string",
            placeholder: "name@email.com",
            required: true,
            default: "",
          },
          {
            displayName: "Name",
            name: "name",
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
            type: "number",
            default: 1,
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
        displayName: "Brand ID",
        name: "brandId",
        type: "string",
        default: "",
      },
      {
        displayName: "Change Routing Order",
        name: "changeRoutingOrder",
        type: "boolean",
        default: false,
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
        displayName: "Merge Roles On Draft",
        name: "mergeRolesOnDraft",
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
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const emailSubject = this.getNodeParameter("emailSubject", index) as string;
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

  const body: IDataObject = {
    emailSubject,
    status: additionalFields.status || EnvelopeStatus.SENT,
  };

  if (additionalFields.emailBlurb) {
    body.emailBlurb = additionalFields.emailBlurb;
  }

  if (documentSource === DocumentSourceType.TEMPLATE) {
    const templateId = this.getNodeParameter("templateId", index) as string;
    body.templateId = templateId;
  } else {
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

    body.documents = [
      {
        documentBase64,
        name: documentName,
        fileExtension,
        documentId: "1",
      },
    ];
  }

  const recipients: IDataObject = {};
  if (recipientsData.signers) {
    recipients.signers = recipientsData.signers;
  }
  if (recipientsData.carbonCopies) {
    recipients.carbonCopies = recipientsData.carbonCopies;
  }

  if (Object.keys(recipients).length > 0) {
    body.recipients = recipients;
  }

  const optionalFields = [
    "enableWetSign",
    "allowMarkup",
    "allowReassign",
    "enforceSignerVisibility",
    "brandId",
  ];

  optionalFields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      body[field] = additionalFields[field];
    }
  });

  const queryParams: IDataObject = {};
  if (additionalFields.changeRoutingOrder !== undefined) {
    queryParams.change_routing_order = additionalFields.changeRoutingOrder;
  }
  if (additionalFields.mergeRolesOnDraft !== undefined) {
    queryParams.merge_roles_on_draft = additionalFields.mergeRolesOnDraft;
  }

  const response = await docusignApiRequest.call(
    this,
    "POST",
    "/envelopes",
    body,
    queryParams,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
