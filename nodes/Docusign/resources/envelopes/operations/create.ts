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
  SIGNING_LOCATION_OPTIONS,
} from "@utils/constants";

const signerFields: INodeProperties[] = [
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
  {
    displayName: "First Name",
    name: "firstName",
    type: "string",
    default: "",
  },
  {
    displayName: "Last Name",
    name: "lastName",
    type: "string",
    default: "",
  },
  {
    displayName: "Client User ID",
    name: "clientUserId",
    type: "string",
    default: "",
    description: "Set this to enable embedded signing. Use a unique ID for this signer.",
  },
  {
    displayName: "Access Code",
    name: "accessCode",
    type: "string",
    default: "",
    description: "Access code required for the signer to view the envelope",
  },
  {
    displayName: "Add Access Code to Email",
    name: "addAccessCodeToEmail",
    type: "boolean",
    default: false,
    description: "Whether to include the access code in the email sent to the signer",
  },
  {
    displayName: "Require ID Lookup",
    name: "requireIdLookup",
    type: "boolean",
    default: false,
    description: "Whether ID verification is required for the signer",
  },
  {
    displayName: "ID Check Configuration Name",
    name: "idCheckConfigurationName",
    type: "options",
    default: "",
    options: [
      { name: "ID Check $", value: "ID Check $" },
      { name: "ID Check $$", value: "ID Check $$" },
      { name: "None", value: "" },
      { name: "Phone Auth $", value: "Phone Auth $" },
      { name: "SMS Auth $", value: "SMS Auth $" },
    ],
    description: "The type of ID verification to use",
  },
  {
    displayName: "Delivery Method",
    name: "deliveryMethod",
    type: "options",
    default: "email",
    options: [
      { name: "Email", value: "email" },
      { name: "SMS", value: "sms" },
      { name: "Offline", value: "offline" },
    ],
  },
  {
    displayName: "Note",
    name: "note",
    type: "string",
    default: "",
    description: "A note sent to the signer in the email",
  },
  {
    displayName: "Role Name",
    name: "roleName",
    type: "string",
    default: "",
    description: "Role name for template-based envelopes",
  },
  {
    displayName: "Signing Group ID",
    name: "signingGroupId",
    type: "string",
    default: "",
    description: "ID of the signing group this signer belongs to",
  },
  {
    displayName: "Embedded Recipient Start URL",
    name: "embeddedRecipientStartURL",
    type: "string",
    default: "",
    description: "URL to redirect the signer to before signing",
  },
  {
    displayName: "Tabs",
    name: "tabs",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    options: [
      {
        name: "signHereTabs",
        displayName: "Sign Here Tabs",
        values: [
          {
            displayName: "Document ID",
            name: "documentId",
            type: "string",
            default: "1",
          },
          {
            displayName: "Page Number",
            name: "pageNumber",
            type: "string",
            default: "1",
          },
          {
            displayName: "X Position",
            name: "xPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Y Position",
            name: "yPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Anchor String",
            name: "anchorString",
            type: "string",
            default: "",
            description: "Text in the document to anchor the tab to",
          },
          {
            displayName: "Anchor X Offset",
            name: "anchorXOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Anchor Y Offset",
            name: "anchorYOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Tab Label",
            name: "tabLabel",
            type: "string",
            default: "",
          },
          {
            displayName: "Optional",
            name: "optional",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Scale Value",
            name: "scaleValue",
            type: "number",
            default: 1,
          },
        ],
      },
      {
        name: "initialHereTabs",
        displayName: "Initial Here Tabs",
        values: [
          {
            displayName: "Document ID",
            name: "documentId",
            type: "string",
            default: "1",
          },
          {
            displayName: "Page Number",
            name: "pageNumber",
            type: "string",
            default: "1",
          },
          {
            displayName: "X Position",
            name: "xPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Y Position",
            name: "yPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Anchor String",
            name: "anchorString",
            type: "string",
            default: "",
          },
          {
            displayName: "Anchor X Offset",
            name: "anchorXOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Anchor Y Offset",
            name: "anchorYOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Tab Label",
            name: "tabLabel",
            type: "string",
            default: "",
          },
          {
            displayName: "Optional",
            name: "optional",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Scale Value",
            name: "scaleValue",
            type: "number",
            default: 1,
          },
        ],
      },
      {
        name: "dateSignedTabs",
        displayName: "Date Signed Tabs",
        values: [
          {
            displayName: "Document ID",
            name: "documentId",
            type: "string",
            default: "1",
          },
          {
            displayName: "Page Number",
            name: "pageNumber",
            type: "string",
            default: "1",
          },
          {
            displayName: "X Position",
            name: "xPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Y Position",
            name: "yPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Anchor String",
            name: "anchorString",
            type: "string",
            default: "",
          },
          {
            displayName: "Anchor X Offset",
            name: "anchorXOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Anchor Y Offset",
            name: "anchorYOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Tab Label",
            name: "tabLabel",
            type: "string",
            default: "",
          },
          {
            displayName: "Font",
            name: "font",
            type: "string",
            default: "",
          },
          {
            displayName: "Font Size",
            name: "fontSize",
            type: "string",
            default: "",
          },
        ],
      },
      {
        name: "textTabs",
        displayName: "Text Tabs",
        values: [
          {
            displayName: "Document ID",
            name: "documentId",
            type: "string",
            default: "1",
          },
          {
            displayName: "Page Number",
            name: "pageNumber",
            type: "string",
            default: "1",
          },
          {
            displayName: "X Position",
            name: "xPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Y Position",
            name: "yPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Anchor String",
            name: "anchorString",
            type: "string",
            default: "",
          },
          {
            displayName: "Anchor X Offset",
            name: "anchorXOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Anchor Y Offset",
            name: "anchorYOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Tab Label",
            name: "tabLabel",
            type: "string",
            default: "",
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
          },
          {
            displayName: "Required",
            name: "required",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Locked",
            name: "locked",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Width",
            name: "width",
            type: "number",
            default: 100,
          },
          {
            displayName: "Height",
            name: "height",
            type: "number",
            default: 20,
          },
          {
            displayName: "Max Length",
            name: "maxLength",
            type: "number",
            default: 0,
          },
          {
            displayName: "Font",
            name: "font",
            type: "string",
            default: "",
          },
          {
            displayName: "Font Size",
            name: "fontSize",
            type: "string",
            default: "",
          },
        ],
      },
      {
        name: "checkboxTabs",
        displayName: "Checkbox Tabs",
        values: [
          {
            displayName: "Document ID",
            name: "documentId",
            type: "string",
            default: "1",
          },
          {
            displayName: "Page Number",
            name: "pageNumber",
            type: "string",
            default: "1",
          },
          {
            displayName: "X Position",
            name: "xPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Y Position",
            name: "yPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Anchor String",
            name: "anchorString",
            type: "string",
            default: "",
          },
          {
            displayName: "Anchor X Offset",
            name: "anchorXOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Anchor Y Offset",
            name: "anchorYOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Tab Label",
            name: "tabLabel",
            type: "string",
            default: "",
          },
          {
            displayName: "Selected",
            name: "selected",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Required",
            name: "required",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Locked",
            name: "locked",
            type: "boolean",
            default: false,
          },
        ],
      },
      {
        name: "fullNameTabs",
        displayName: "Full Name Tabs",
        values: [
          {
            displayName: "Document ID",
            name: "documentId",
            type: "string",
            default: "1",
          },
          {
            displayName: "Page Number",
            name: "pageNumber",
            type: "string",
            default: "1",
          },
          {
            displayName: "X Position",
            name: "xPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Y Position",
            name: "yPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Anchor String",
            name: "anchorString",
            type: "string",
            default: "",
          },
          {
            displayName: "Anchor X Offset",
            name: "anchorXOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Anchor Y Offset",
            name: "anchorYOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Tab Label",
            name: "tabLabel",
            type: "string",
            default: "",
          },
        ],
      },
      {
        name: "emailTabs",
        displayName: "Email Tabs",
        values: [
          {
            displayName: "Document ID",
            name: "documentId",
            type: "string",
            default: "1",
          },
          {
            displayName: "Page Number",
            name: "pageNumber",
            type: "string",
            default: "1",
          },
          {
            displayName: "X Position",
            name: "xPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Y Position",
            name: "yPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Anchor String",
            name: "anchorString",
            type: "string",
            default: "",
          },
          {
            displayName: "Anchor X Offset",
            name: "anchorXOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Anchor Y Offset",
            name: "anchorYOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Tab Label",
            name: "tabLabel",
            type: "string",
            default: "",
          },
        ],
      },
      {
        name: "companyTabs",
        displayName: "Company Tabs",
        values: [
          {
            displayName: "Document ID",
            name: "documentId",
            type: "string",
            default: "1",
          },
          {
            displayName: "Page Number",
            name: "pageNumber",
            type: "string",
            default: "1",
          },
          {
            displayName: "X Position",
            name: "xPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Y Position",
            name: "yPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Anchor String",
            name: "anchorString",
            type: "string",
            default: "",
          },
          {
            displayName: "Anchor X Offset",
            name: "anchorXOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Anchor Y Offset",
            name: "anchorYOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Tab Label",
            name: "tabLabel",
            type: "string",
            default: "",
          },
        ],
      },
      {
        name: "titleTabs",
        displayName: "Title Tabs",
        values: [
          {
            displayName: "Document ID",
            name: "documentId",
            type: "string",
            default: "1",
          },
          {
            displayName: "Page Number",
            name: "pageNumber",
            type: "string",
            default: "1",
          },
          {
            displayName: "X Position",
            name: "xPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Y Position",
            name: "yPosition",
            type: "string",
            default: "100",
          },
          {
            displayName: "Anchor String",
            name: "anchorString",
            type: "string",
            default: "",
          },
          {
            displayName: "Anchor X Offset",
            name: "anchorXOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Anchor Y Offset",
            name: "anchorYOffset",
            type: "string",
            default: "0",
          },
          {
            displayName: "Tab Label",
            name: "tabLabel",
            type: "string",
            default: "",
          },
        ],
      },
    ],
  },
  {
    displayName: "Phone Authentication",
    name: "phoneAuthentication",
    type: "fixedCollection",
    default: {},
    options: [
      {
        name: "phoneAuth",
        displayName: "Phone Authentication",
        values: [
          {
            displayName: "Recipient May Provide Number",
            name: "recipMayProvideNumber",
            type: "boolean",
            default: true,
          },
          {
            displayName: "Sender Provided Numbers",
            name: "senderProvidedNumbers",
            type: "string",
            default: "",
            description: "Comma-separated phone numbers",
          },
          {
            displayName: "Record Voice Print",
            name: "recordVoicePrint",
            type: "boolean",
            default: false,
          },
        ],
      },
    ],
  },
  {
    displayName: "SMS Authentication",
    name: "smsAuthentication",
    type: "fixedCollection",
    default: {},
    options: [
      {
        name: "smsAuth",
        displayName: "SMS Authentication",
        values: [
          {
            displayName: "Sender Provided Numbers",
            name: "senderProvidedNumbers",
            type: "string",
            default: "",
            description: "Comma-separated phone numbers for SMS authentication",
          },
        ],
      },
    ],
  },
];

const carbonCopyFields: INodeProperties[] = [
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
  {
    displayName: "Note",
    name: "note",
    type: "string",
    default: "",
  },
  {
    displayName: "Role Name",
    name: "roleName",
    type: "string",
    default: "",
  },
];

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
        values: signerFields,
      },
      {
        name: "carbonCopies",
        displayName: "Carbon Copies",
        values: carbonCopyFields,
      },
      {
        name: "certifiedDeliveries",
        displayName: "Certified Deliveries",
        values: carbonCopyFields,
      },
      {
        name: "agents",
        displayName: "Agents",
        values: signerFields,
      },
      {
        name: "editors",
        displayName: "Editors",
        values: signerFields,
      },
      {
        name: "intermediaries",
        displayName: "Intermediaries",
        values: carbonCopyFields,
      },
      {
        name: "inPersonSigners",
        displayName: "In Person Signers",
        values: [
          ...signerFields,
          {
            displayName: "Host Email",
            name: "hostEmail",
            type: "string",
            default: "",
            description: "Email of the person hosting the in-person signing",
          },
          {
            displayName: "Host Name",
            name: "hostName",
            type: "string",
            default: "",
            description: "Name of the person hosting the in-person signing",
          },
          {
            displayName: "Signer Name",
            name: "signerName",
            type: "string",
            default: "",
            description: "Name of the in-person signer",
          },
        ],
      },
    ],
  },
  {
    displayName: "Template Roles",
    name: "templateRoles",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    placeholder: "Add Template Role",
    displayOptions: {
      show: {
        documentSource: [DocumentSourceType.TEMPLATE],
      },
    },
    description: "Assign recipients to template roles",
    options: [
      {
        name: "roles",
        displayName: "Roles",
        values: [
          {
            displayName: "Role Name",
            name: "roleName",
            type: "string",
            required: true,
            default: "",
            description: "The role name as defined in the template",
          },
          {
            displayName: "Email",
            name: "email",
            type: "string",
												placeholder: 'name@email.com',
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
            displayName: "Client User ID",
            name: "clientUserId",
            type: "string",
            default: "",
            description: "Set this for embedded signing",
          },
          {
            displayName: "Access Code",
            name: "accessCode",
            type: "string",
            default: "",
          },
          {
            displayName: "Delivery Method",
            name: "deliveryMethod",
            type: "options",
            default: "email",
            options: [
              { name: "Email", value: "email" },
              { name: "SMS", value: "sms" },
            ],
          },
          {
            displayName: "Tabs",
            name: "tabs",
            type: "fixedCollection",
            typeOptions: {
              multipleValues: true,
            },
            default: {},
            options: [
              {
                name: "textTabs",
                displayName: "Text Tabs",
                values: [
                  {
                    displayName: "Tab Label",
                    name: "tabLabel",
                    type: "string",
                    required: true,
                    default: "",
                  },
                  {
                    displayName: "Value",
                    name: "value",
                    type: "string",
                    default: "",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    displayName: "Event Notification",
    name: "eventNotification",
    type: "fixedCollection",
    default: {},
    description: "Configure webhook notifications for envelope events",
    options: [
      {
        name: "notification",
        displayName: "Notification Settings",
        values: [
          {
            displayName: "URL",
            name: "url",
            type: "string",
            required: true,
            default: "",
            description: "The URL to receive webhook notifications",
          },
          {
            displayName: "Logging Enabled",
            name: "loggingEnabled",
            type: "boolean",
            default: true,
          },
          {
            displayName: "Require Acknowledgment",
            name: "requireAcknowledgment",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Include Documents",
            name: "includeDocuments",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Include Envelope Void Reason",
            name: "includeEnvelopeVoidReason",
            type: "boolean",
            default: true,
          },
          {
            displayName: "Include Time Zone",
            name: "includeTimeZone",
            type: "boolean",
            default: true,
          },
          {
            displayName: "Include Sender Account As Custom Field",
            name: "includeSenderAccountAsCustomField",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Include Document Fields",
            name: "includeDocumentFields",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Include Certificate of Completion",
            name: "includeCertificateOfCompletion",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Envelope Events",
            name: "envelopeEvents",
            type: "multiOptions",
            default: [],
            options: [
              { name: "Completed", value: "completed" },
              { name: "Declined", value: "declined" },
              { name: "Delivered", value: "delivered" },
              { name: "Sent", value: "sent" },
              { name: "Voided", value: "voided" },
            ],
          },
          {
            displayName: "Recipient Events",
            name: "recipientEvents",
            type: "multiOptions",
            default: [],
            options: [
              { name: "Authentication Failed", value: "authenticationfailed" },
              { name: "Auto Responded", value: "autoresponded" },
              { name: "Completed", value: "completed" },
              { name: "Declined", value: "declined" },
              { name: "Delivered", value: "delivered" },
              { name: "Sent", value: "sent" },
            ],
          },
        ],
      },
    ],
  },
  {
    displayName: "Custom Fields",
    name: "customFields",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    description: "Add custom fields to the envelope for tracking",
    options: [
      {
        name: "textCustomFields",
        displayName: "Text Custom Fields",
        values: [
          {
            displayName: "Name",
            name: "name",
            type: "string",
            required: true,
            default: "",
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
          },
          {
            displayName: "Required",
            name: "required",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Show",
            name: "show",
            type: "boolean",
            default: true,
          },
        ],
      },
      {
        name: "listCustomFields",
        displayName: "List Custom Fields",
        values: [
          {
            displayName: "Name",
            name: "name",
            type: "string",
            required: true,
            default: "",
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
          },
          {
            displayName: "List Items",
            name: "listItems",
            type: "string",
            default: "",
            description: "Comma-separated list of options",
          },
          {
            displayName: "Required",
            name: "required",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Show",
            name: "show",
            type: "boolean",
            default: true,
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
        displayName: "Allow Comments",
        name: "allowComments",
        type: "boolean",
        default: false,
        description: "Whether to allow comments on the envelope",
      },
      {
        displayName: "Allow Markup",
        name: "allowMarkup",
        type: "boolean",
        default: false,
        description: "Whether to allow markup on documents",
      },
      {
        displayName: "Allow Reassign",
        name: "allowReassign",
        type: "boolean",
        default: false,
        description: "Whether recipients can reassign the envelope",
      },
      {
        displayName: "Allow Recipient Recursion",
        name: "allowRecipientRecursion",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Allow View History",
        name: "allowViewHistory",
        type: "boolean",
        default: true,
      },
      {
        displayName: "Any Signer",
        name: "anySigner",
        type: "boolean",
        default: false,
        description: "Whether to allow any signer to sign the document regardless of order",
      },
      {
        displayName: "Asynchronous",
        name: "asynchronous",
        type: "boolean",
        default: false,
        description: "Whether to process the envelope asynchronously",
      },
      {
        displayName: "Authoritative Copy",
        name: "authoritativeCopy",
        type: "boolean",
        default: false,
        description: "Whether to mark this envelope as the authoritative copy",
      },
      {
        displayName: "Auto Navigation",
        name: "autoNavigation",
        type: "boolean",
        default: true,
        description: "Whether to automatically navigate signers through tabs",
      },
      {
        displayName: "Brand ID",
        name: "brandId",
        type: "string",
        default: "",
        description: "The brand ID to use for the envelope",
      },
      {
        displayName: "Burn Default Tab Data",
        name: "burnDefaultTabData",
        type: "boolean",
        default: false,
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
        description: "The message body of the email sent with the envelope",
      },
      {
        displayName: "Enable Wet Sign",
        name: "enableWetSign",
        type: "boolean",
        default: true,
        description: "Whether to allow signers to print and sign on paper",
      },
      {
        displayName: "Enforce Signer Visibility",
        name: "enforceSignerVisibility",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Envelope ID Stamping",
        name: "envelopeIdStamping",
        type: "boolean",
        default: true,
        description: "Whether to stamp the envelope ID on documents",
      },
      {
        displayName: "Expire After (Days)",
        name: "expireAfter",
        type: "number",
        default: 120,
        description: "Number of days before the envelope expires",
      },
      {
        displayName: "Expire DateTime",
        name: "expireDateTime",
        type: "dateTime",
        default: "",
        description: "Specific date/time when the envelope expires",
      },
      {
        displayName: "Expire Enabled",
        name: "expireEnabled",
        type: "boolean",
        default: false,
        description: "Whether to enable envelope expiration",
      },
      {
        displayName: "Expire Warn (Days)",
        name: "expireWarn",
        type: "number",
        default: 0,
        description: "Days before expiration to warn recipients",
      },
      {
        displayName: "External Envelope ID",
        name: "externalEnvelopeId",
        type: "string",
        default: "",
        description: "External ID for tracking in your system",
      },
      {
        displayName: "Merge Roles On Draft",
        name: "mergeRolesOnDraft",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Message Lock",
        name: "messageLock",
        type: "boolean",
        default: false,
        description: "Whether to prevent changes to the email message",
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: {
          password: true,
        },
        default: "",
        description: "Password to protect the envelope",
      },
      {
        displayName: "Recipients Lock",
        name: "recipientsLock",
        type: "boolean",
        default: false,
        description: "Whether to prevent changes to recipients",
      },
      {
        displayName: "Signer Can Sign On Mobile",
        name: "signerCanSignOnMobile",
        type: "boolean",
        default: true,
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
        default: "sent",
        options: ENVELOPE_STATUS_OPTIONS,
        description: "The status of the envelope. Use 'created' to save as draft.",
      },
      {
        displayName: "Use Disclosure",
        name: "useDisclosure",
        type: "boolean",
        default: false,
      },
    ],
  },
  {
    displayName: "Notification Settings",
    name: "notification",
    type: "fixedCollection",
    default: {},
    description: "Email notification settings for the envelope",
    options: [
      {
        name: "settings",
        displayName: "Settings",
        values: [
          {
            displayName: "Use Account Defaults",
            name: "useAccountDefaults",
            type: "boolean",
            default: true,
          },
          {
            displayName: "Reminder Enabled",
            name: "reminders.reminderEnabled",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Reminder Delay (Days)",
            name: "reminders.reminderDelay",
            type: "number",
            default: 0,
          },
          {
            displayName: "Reminder Frequency (Days)",
            name: "reminders.reminderFrequency",
            type: "number",
            default: 0,
          },
          {
            displayName: "Expiration Enabled",
            name: "expirations.expireEnabled",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Expiration After (Days)",
            name: "expirations.expireAfter",
            type: "number",
            default: 120,
          },
          {
            displayName: "Expiration Warn (Days)",
            name: "expirations.expireWarn",
            type: "number",
            default: 0,
          },
        ],
      },
    ],
  },
];

function processSignerTabs(signer: IDataObject): IDataObject | undefined {
  const tabs = signer.tabs as IDataObject;
  if (!tabs || Object.keys(tabs).length === 0) {
    return undefined;
  }

  const processedTabs: IDataObject = {};
  const tabTypes = [
    "signHereTabs",
    "initialHereTabs",
    "dateSignedTabs",
    "textTabs",
    "checkboxTabs",
    "fullNameTabs",
    "emailTabs",
    "companyTabs",
    "titleTabs",
  ];

  tabTypes.forEach((tabType) => {
    if (tabs[tabType] && Array.isArray(tabs[tabType])) {
      processedTabs[tabType] = tabs[tabType];
    }
  });

  return Object.keys(processedTabs).length > 0 ? processedTabs : undefined;
}

function processPhoneAuthentication(
  signer: IDataObject,
): IDataObject | undefined {
  const phoneAuth = signer.phoneAuthentication as IDataObject;
  if (!phoneAuth?.phoneAuth) {
    return undefined;
  }

  const auth = (phoneAuth.phoneAuth as IDataObject[])[0];
  if (!auth) return undefined;

  const result: IDataObject = {
    recipMayProvideNumber: auth.recipMayProvideNumber ?? true,
    recordVoicePrint: auth.recordVoicePrint ?? false,
  };

  if (auth.senderProvidedNumbers) {
    result.senderProvidedNumbers = (auth.senderProvidedNumbers as string)
      .split(",")
      .map((n) => n.trim());
  }

  return result;
}

function processSmsAuthentication(signer: IDataObject): IDataObject | undefined {
  const smsAuth = signer.smsAuthentication as IDataObject;
  if (!smsAuth?.smsAuth) {
    return undefined;
  }

  const auth = (smsAuth.smsAuth as IDataObject[])[0];
  if (!auth) return undefined;

  if (auth.senderProvidedNumbers) {
    return {
      senderProvidedNumbers: (auth.senderProvidedNumbers as string)
        .split(",")
        .map((n) => n.trim()),
    };
  }

  return undefined;
}

function processRecipient(recipient: IDataObject): IDataObject {
  const processed: IDataObject = {};

  const directFields = [
    "email",
    "name",
    "recipientId",
    "routingOrder",
    "firstName",
    "lastName",
    "clientUserId",
    "accessCode",
    "addAccessCodeToEmail",
    "requireIdLookup",
    "idCheckConfigurationName",
    "deliveryMethod",
    "note",
    "roleName",
    "signingGroupId",
    "embeddedRecipientStartURL",
    "hostEmail",
    "hostName",
    "signerName",
  ];

  directFields.forEach((field) => {
    if (recipient[field] !== undefined && recipient[field] !== "") {
      processed[field] = recipient[field];
    }
  });

  const tabs = processSignerTabs(recipient);
  if (tabs) {
    processed.tabs = tabs;
  }

  const phoneAuth = processPhoneAuthentication(recipient);
  if (phoneAuth) {
    processed.phoneAuthentication = phoneAuth;
  }

  const smsAuth = processSmsAuthentication(recipient);
  if (smsAuth) {
    processed.smsAuthentication = smsAuth;
  }

  return processed;
}

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

    const templateRolesData = this.getNodeParameter(
      "templateRoles",
      index,
      {},
    ) as IDataObject;

    if (templateRolesData.roles && Array.isArray(templateRolesData.roles)) {
      body.templateRoles = (templateRolesData.roles as IDataObject[]).map(
        (role) => {
          const processed: IDataObject = {};
          const roleFields = [
            "roleName",
            "email",
            "name",
            "clientUserId",
            "accessCode",
            "deliveryMethod",
          ];

          roleFields.forEach((field) => {
            if (role[field] !== undefined && role[field] !== "") {
              processed[field] = role[field];
            }
          });

          if (role.tabs) {
            const tabs = role.tabs as IDataObject;
            if (tabs.textTabs && Array.isArray(tabs.textTabs)) {
              processed.tabs = { textTabs: tabs.textTabs };
            }
          }

          return processed;
        },
      );
    }
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
  const recipientTypes = [
    "signers",
    "carbonCopies",
    "certifiedDeliveries",
    "agents",
    "editors",
    "intermediaries",
    "inPersonSigners",
  ];

  recipientTypes.forEach((type) => {
    if (recipientsData[type] && Array.isArray(recipientsData[type])) {
      recipients[type] = (recipientsData[type] as IDataObject[]).map(
        processRecipient,
      );
    }
  });

  if (Object.keys(recipients).length > 0) {
    body.recipients = recipients;
  }

  const eventNotificationData = this.getNodeParameter(
    "eventNotification",
    index,
    {},
  ) as IDataObject;

  if (
    eventNotificationData.notification &&
    Array.isArray(eventNotificationData.notification)
  ) {
    const notif = eventNotificationData.notification[0] as IDataObject;
    if (notif && notif.url) {
      const eventNotification: IDataObject = {
        url: notif.url,
        loggingEnabled: notif.loggingEnabled ?? true,
        requireAcknowledgment: notif.requireAcknowledgment ?? false,
        includeDocuments: notif.includeDocuments ?? false,
        includeEnvelopeVoidReason: notif.includeEnvelopeVoidReason ?? true,
        includeTimeZone: notif.includeTimeZone ?? true,
        includeSenderAccountAsCustomField:
          notif.includeSenderAccountAsCustomField ?? false,
        includeDocumentFields: notif.includeDocumentFields ?? false,
        includeCertificateOfCompletion:
          notif.includeCertificateOfCompletion ?? false,
      };

      if (notif.envelopeEvents && Array.isArray(notif.envelopeEvents)) {
        eventNotification.envelopeEvents = (
          notif.envelopeEvents as string[]
        ).map((event) => ({
          envelopeEventStatusCode: event,
        }));
      }

      if (notif.recipientEvents && Array.isArray(notif.recipientEvents)) {
        eventNotification.recipientEvents = (
          notif.recipientEvents as string[]
        ).map((event) => ({
          recipientEventStatusCode: event,
        }));
      }

      body.eventNotification = eventNotification;
    }
  }

  const customFieldsData = this.getNodeParameter(
    "customFields",
    index,
    {},
  ) as IDataObject;

  if (
    customFieldsData.textCustomFields ||
    customFieldsData.listCustomFields
  ) {
    const customFields: IDataObject = {};

    if (
      customFieldsData.textCustomFields &&
      Array.isArray(customFieldsData.textCustomFields)
    ) {
      customFields.textCustomFields = customFieldsData.textCustomFields;
    }

    if (
      customFieldsData.listCustomFields &&
      Array.isArray(customFieldsData.listCustomFields)
    ) {
      customFields.listCustomFields = (
        customFieldsData.listCustomFields as IDataObject[]
      ).map((field) => {
        const processed = { ...field };
        if (field.listItems && typeof field.listItems === "string") {
          processed.listItems = (field.listItems as string)
            .split(",")
            .map((item) => item.trim());
        }
        return processed;
      });
    }

    body.customFields = customFields;
  }

  const notificationData = this.getNodeParameter(
    "notification",
    index,
    {},
  ) as IDataObject;

  if (notificationData.settings && Array.isArray(notificationData.settings)) {
    const settings = notificationData.settings[0] as IDataObject;
    if (settings) {
      const notification: IDataObject = {
        useAccountDefaults: settings.useAccountDefaults ?? true,
      };

      if (settings["reminders.reminderEnabled"] !== undefined) {
        notification.reminders = {
          reminderEnabled: settings["reminders.reminderEnabled"],
          reminderDelay: settings["reminders.reminderDelay"] || 0,
          reminderFrequency: settings["reminders.reminderFrequency"] || 0,
        };
      }

      if (settings["expirations.expireEnabled"] !== undefined) {
        notification.expirations = {
          expireEnabled: settings["expirations.expireEnabled"],
          expireAfter: settings["expirations.expireAfter"] || 120,
          expireWarn: settings["expirations.expireWarn"] || 0,
        };
      }

      body.notification = notification;
    }
  }

  const optionalFields = [
    "enableWetSign",
    "allowMarkup",
    "allowReassign",
    "allowRecipientRecursion",
    "allowViewHistory",
    "allowComments",
    "anySigner",
    "asynchronous",
    "authoritativeCopy",
    "autoNavigation",
    "burnDefaultTabData",
    "enforceSignerVisibility",
    "envelopeIdStamping",
    "expireAfter",
    "expireDateTime",
    "expireEnabled",
    "expireWarn",
    "externalEnvelopeId",
    "messageLock",
    "password",
    "recipientsLock",
    "signerCanSignOnMobile",
    "signingLocation",
    "useDisclosure",
    "brandId",
  ];

  optionalFields.forEach((field) => {
    if (additionalFields[field] !== undefined && additionalFields[field] !== "") {
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
