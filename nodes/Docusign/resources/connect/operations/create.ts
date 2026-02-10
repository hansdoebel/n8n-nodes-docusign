import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";
import { API_ENDPOINTS } from "@utils/constants";

export const description: INodeProperties[] = [
  {
    displayName: "URL to Publish",
    name: "urlToPublishTo",
    type: "string",
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
    displayName: "Envelope Events",
    name: "envelopeEvents",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    placeholder: "Add Envelope Event",
    options: [
      {
        name: "events",
        displayName: "Events",
        values: [
          {
            displayName: "Envelope Event Status Code",
            name: "envelopeEventStatusCode",
            type: "options",
            required: true,
            default: "Sent",
            options: [
              { name: "Completed", value: "Completed" },
              { name: "Correct", value: "Correct" },
              { name: "Declined", value: "Declined" },
              { name: "Delivered", value: "Delivered" },
              { name: "Purge", value: "Purge" },
              { name: "Sent", value: "Sent" },
              { name: "Template Created", value: "TemplateCreated" },
              { name: "Template Deleted", value: "TemplateDeleted" },
              { name: "Template Modified", value: "TemplateModified" },
              { name: "Voided", value: "Voided" },
            ],
          },
          {
            displayName: "Include Documents",
            name: "includeDocuments",
            type: "boolean",
            default: false,
          },
        ],
      },
    ],
  },
  {
    displayName: "Recipient Events",
    name: "recipientEvents",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    placeholder: "Add Recipient Event",
    options: [
      {
        name: "events",
        displayName: "Events",
        values: [
          {
            displayName: "Recipient Event Status Code",
            name: "recipientEventStatusCode",
            type: "options",
            required: true,
            default: "Sent",
            options: [
              { name: "Authentication Failed", value: "AuthenticationFailed" },
              { name: "Auto Responded", value: "AutoResponded" },
              { name: "Completed", value: "Completed" },
              { name: "Declined", value: "Declined" },
              { name: "Delivered", value: "Delivered" },
              { name: "Delivery Failed", value: "DeliveryFailed" },
              { name: "Finish Later", value: "FinishLater" },
              { name: "Reassign Recipient", value: "ReassignRecipient" },
              { name: "Sent", value: "Sent" },
              { name: "Signed", value: "Signed" },
            ],
          },
          {
            displayName: "Include Documents",
            name: "includeDocuments",
            type: "boolean",
            default: false,
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
        displayName: "All Users",
        name: "allUsers",
        type: "boolean",
        default: true,
      },
      {
        displayName: "All Users Except",
        name: "allUsersExcept",
        type: "string",
        default: "",
      },
      {
        displayName: "Allow Envelope Publish",
        name: "allowEnvelopePublish",
        type: "boolean",
        default: true,
      },
      {
        displayName: "Configuration Type",
        name: "configurationType",
        type: "options",
        default: "custom",
        options: [
          { name: "Custom", value: "custom" },
          { name: "Salesforce", value: "salesforce" },
          { name: "eOriginal", value: "eoriginal" },
        ],
      },
      {
        displayName: "Delivery Mode",
        name: "deliveryMode",
        type: "options",
        default: "SIM",
        options: [
          { name: "SIM (Sequential)", value: "SIM" },
          { name: "Aggregate", value: "Aggregate" },
        ],
      },
      {
        displayName: "Disable Mutual TLS",
        name: "disableMutualTls",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Enable Log",
        name: "enableLog",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Event Data",
        name: "eventData",
        type: "fixedCollection",
        default: {},
        options: [
          {
            name: "settings",
            displayName: "Settings",
            values: [
              {
                displayName: "Format",
                name: "format",
                type: "options",
                default: "json",
                options: [
                  { name: "JSON", value: "json" },
                  { name: "XML", value: "xml" },
                ],
              },
              {
                displayName: "Include Data",
                name: "includeData",
                type: "multiOptions",
                default: [],
                options: [
                  { name: "Attachments", value: "attachments" },
                  { name: "Custom Fields", value: "custom_fields" },
                  { name: "Documents", value: "documents" },
                  { name: "Extensions", value: "extensions" },
                  { name: "Folders", value: "folders" },
                  { name: "Payment Tabs", value: "payment_tabs" },
                  { name: "Power Form", value: "powerform" },
                  { name: "Recipients", value: "recipients" },
                  { name: "Tabs", value: "tabs" },
                ],
              },
              {
                displayName: "Version",
                name: "version",
                type: "options",
                default: "restv2.1",
                options: [
                  { name: "REST v2.1", value: "restv2.1" },
                  { name: 'REST V2', value: "restv2" },
                  { name: "SOAP", value: "soap" },
                ],
              },
            ],
          },
        ],
      },
      {
        displayName: "External Folder ID",
        name: "externalFolderId",
        type: "string",
        default: "",
      },
      {
        displayName: "External Folder Label",
        name: "externalFolderLabel",
        type: "string",
        default: "",
      },
      {
        displayName: "HMAC Secret",
        name: "hmacSecret",
        type: "string",
        typeOptions: {
          password: true,
        },
        default: "",
      },
      {
        displayName: "Include Certificate of Completion",
        name: "includeCertificateOfCompletion",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Include Certificate With SOAP",
        name: "includeCertSoapHeader",
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
        displayName: "Include Documents",
        name: "includeDocuments",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Include Envelope Void Reason",
        name: "includeEnvelopeVoidReason",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Include HMAC Signature",
        name: "includeHmacSignature",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Include OAuth",
        name: "includeOAuth",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Include Sender Account as Custom Field",
        name: "includeSenderAccountAsCustomField",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Include Time Zone",
        name: "includeTimeZone",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Require Acknowledgement",
        name: "requiresAcknowledgement",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Require Mutual TLS",
        name: "requireMutualTls",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Signing Message Order",
        name: "signMessageWithX509Certificate",
        type: "boolean",
        default: false,
      },
      {
        displayName: "SOAP Namespace",
        name: "soapNamespace",
        type: "string",
        default: "",
      },
      {
        displayName: "URL to Publish Draft Envelope",
        name: "urlToPublishDraftEnvelope",
        type: "string",
        default: "",
      },
      {
        displayName: "Use SOAP Interface",
        name: "useSoapInterface",
        type: "boolean",
        default: false,
      },
      {
        displayName: "User IDs",
        name: "userIds",
        type: "string",
        default: "",
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const urlToPublishTo = this.getNodeParameter(
    "urlToPublishTo",
    index,
  ) as string;
  const name = this.getNodeParameter("name", index) as string;
  const envelopeEventsData = this.getNodeParameter(
    "envelopeEvents",
    index,
    {},
  ) as IDataObject;
  const recipientEventsData = this.getNodeParameter(
    "recipientEvents",
    index,
    {},
  ) as IDataObject;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const body: IDataObject = {
    urlToPublishTo,
    name,
  };

  if (envelopeEventsData.events && Array.isArray(envelopeEventsData.events)) {
    body.envelopeEvents = (envelopeEventsData.events as IDataObject[]).map(
      (event) => ({
        envelopeEventStatusCode: event.envelopeEventStatusCode,
        includeDocuments: event.includeDocuments ? "true" : "false",
      }),
    );
  }

  if (
    recipientEventsData.events &&
    Array.isArray(recipientEventsData.events)
  ) {
    body.recipientEvents = (recipientEventsData.events as IDataObject[]).map(
      (event) => ({
        recipientEventStatusCode: event.recipientEventStatusCode,
        includeDocuments: event.includeDocuments ? "true" : "false",
      }),
    );
  }

  const booleanFields = [
    "allowEnvelopePublish",
    "allUsers",
    "disableMutualTls",
    "enableLog",
    "includeCertificateOfCompletion",
    "includeCertSoapHeader",
    "includeDocumentFields",
    "includeDocuments",
    "includeEnvelopeVoidReason",
    "includeHmacSignature",
    "includeOAuth",
    "includeSenderAccountAsCustomField",
    "includeTimeZone",
    "requiresAcknowledgement",
    "requireMutualTls",
    "signMessageWithX509Certificate",
    "useSoapInterface",
  ];

  booleanFields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      body[field] = additionalFields[field] ? "true" : "false";
    }
  });

  const stringFields = [
    "allUsersExcept",
    "configurationType",
    "deliveryMode",
    "externalFolderId",
    "externalFolderLabel",
    "hmacSecret",
    "soapNamespace",
    "urlToPublishDraftEnvelope",
    "userIds",
  ];

  stringFields.forEach((field) => {
    if (
      additionalFields[field] !== undefined &&
      additionalFields[field] !== ""
    ) {
      body[field] = additionalFields[field];
    }
  });

  if (
    additionalFields.eventData &&
    typeof additionalFields.eventData === "object"
  ) {
    const eventDataObj = additionalFields.eventData as IDataObject;
    if (eventDataObj.settings && Array.isArray(eventDataObj.settings)) {
      const settings = eventDataObj.settings[0] as IDataObject;
      if (settings) {
        const eventData: IDataObject = {};
        if (settings.format) {
          eventData.format = settings.format;
        }
        if (settings.version) {
          eventData.version = settings.version;
        }
        if (settings.includeData && Array.isArray(settings.includeData)) {
          eventData.includeData = settings.includeData;
        }
        if (Object.keys(eventData).length > 0) {
          body.eventData = eventData;
        }
      }
    }
  }

  const response = await docusignApiRequest.call(
    this,
    "POST",
    API_ENDPOINTS.CONNECT,
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
