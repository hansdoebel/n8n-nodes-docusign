import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";
import {
  DocumentSourceType,
  SHARED_TYPE_OPTIONS,
  SIGNING_LOCATION_OPTIONS,
  TEMPLATE_STATUS_OPTIONS,
} from "@utils/constants";

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
          {
            displayName: "Default Recipient",
            name: "defaultRecipient",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Access Code",
            name: "accessCode",
            type: "string",
            default: "",
          },
          {
            displayName: "Note",
            name: "note",
            type: "string",
            default: "",
          },
          {
            displayName: "Email Notification",
            name: "emailNotification",
            type: "fixedCollection",
            default: {},
            options: [
              {
                name: "settings",
                displayName: "Settings",
                values: [
                  {
                    displayName: "Email Subject",
                    name: "emailSubject",
                    type: "string",
                    default: "",
                  },
                  {
                    displayName: "Email Body",
                    name: "emailBody",
                    type: "string",
                    typeOptions: {
                      rows: 4,
                    },
                    default: "",
                  },
                  {
                    displayName: "Supported Language",
                    name: "supportedLanguage",
                    type: "string",
                    default: "",
                  },
                ],
              },
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
                name: "signHereTabs",
                displayName: "Sign Here Tabs",
                values: [
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
                    displayName: "Anchor Units",
                    name: "anchorUnits",
                    type: "options",
                    default: "pixels",
                    options: [
                      { name: "Pixels", value: "pixels" },
                      { name: "Inches", value: "inches" },
                      { name: "Centimeters", value: "cms" },
                      { name: "Millimeters", value: "mms" },
                    ],
                  },
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
                    default: "",
                  },
                  {
                    displayName: "Y Position",
                    name: "yPosition",
                    type: "string",
                    default: "",
                  },
                  {
                    displayName: "Scale Value",
                    name: "scaleValue",
                    type: "number",
                    default: 1,
                  },
                  {
                    displayName: "Optional",
                    name: "optional",
                    type: "boolean",
                    default: false,
                  },
                ],
              },
              {
                name: "initialHereTabs",
                displayName: "Initial Here Tabs",
                values: [
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
                    default: "",
                  },
                  {
                    displayName: "Y Position",
                    name: "yPosition",
                    type: "string",
                    default: "",
                  },
                  {
                    displayName: "Scale Value",
                    name: "scaleValue",
                    type: "number",
                    default: 1,
                  },
                  {
                    displayName: "Optional",
                    name: "optional",
                    type: "boolean",
                    default: false,
                  },
                ],
              },
              {
                name: "dateSignedTabs",
                displayName: "Date Signed Tabs",
                values: [
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
                    default: "",
                  },
                  {
                    displayName: "Y Position",
                    name: "yPosition",
                    type: "string",
                    default: "",
                  },
                  {
                    displayName: "Font",
                    name: "font",
                    type: "options",
                    default: "helvetica",
                    options: [
                      { name: "Helvetica", value: "helvetica" },
                      { name: "Arial", value: "arial" },
                      { name: "Courier", value: "courier" },
                      { name: "Times New Roman", value: "timesNewRoman" },
                    ],
                  },
                  {
                    displayName: "Font Size",
                    name: "fontSize",
                    type: "options",
                    default: "size12",
                    options: [
                      { name: "Size 10", value: "size10" },
                      { name: "Size 11", value: "size11" },
                      { name: "Size 12", value: "size12" },
                      { name: "Size 14", value: "size14" },
                      { name: "Size 16", value: "size16" },
                      { name: "Size 18", value: "size18" },
                      { name: "Size 20", value: "size20" },
                      { name: "Size 22", value: "size22" },
                      { name: "Size 24", value: "size24" },
                      { name: "Size 26", value: "size26" },
                      { name: "Size 28", value: "size28" },
                      { name: "Size 36", value: "size36" },
                      { name: "Size 48", value: "size48" },
                      { name: "Size 7", value: "size7" },
                      { name: "Size 72", value: "size72" },
                      { name: "Size 8", value: "size8" },
                      { name: "Size 9", value: "size9" },
                    ],
                  },
                ],
              },
              {
                name: "textTabs",
                displayName: "Text Tabs",
                values: [
                  {
                    displayName: "Tab Label",
                    name: "tabLabel",
                    type: "string",
                    default: "",
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
                    default: "",
                  },
                  {
                    displayName: "Y Position",
                    name: "yPosition",
                    type: "string",
                    default: "",
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
                    displayName: "Max Length",
                    name: "maxLength",
                    type: "number",
                    default: 0,
                  },
                  {
                    displayName: "Validation Pattern",
                    name: "validationPattern",
                    type: "string",
                    default: "",
                  },
                  {
                    displayName: "Validation Message",
                    name: "validationMessage",
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
                    displayName: "Tab Label",
                    name: "tabLabel",
                    type: "string",
                    default: "",
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
                    default: "",
                  },
                  {
                    displayName: "Y Position",
                    name: "yPosition",
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
                name: "radioGroupTabs",
                displayName: "Radio Group Tabs",
                values: [
                  {
                    displayName: "Group Name",
                    name: "groupName",
                    type: "string",
                    required: true,
                    default: "",
                  },
                  {
                    displayName: "Document ID",
                    name: "documentId",
                    type: "string",
                    default: "1",
                  },
                  {
                    displayName: "Required",
                    name: "required",
                    type: "boolean",
                    default: false,
                  },
                  {
                    displayName: "Radios (JSON)",
                    name: "radios",
                    type: "json",
                    default:
                      '[{"pageNumber": "1", "xPosition": "100", "yPosition": "100", "value": "option1"}]',
                  },
                ],
              },
              {
                name: "listTabs",
                displayName: "List/Dropdown Tabs",
                values: [
                  {
                    displayName: "Tab Label",
                    name: "tabLabel",
                    type: "string",
                    default: "",
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
                    default: "",
                  },
                  {
                    displayName: "Y Position",
                    name: "yPosition",
                    type: "string",
                    default: "",
                  },
                  {
                    displayName: "Width",
                    name: "width",
                    type: "number",
                    default: 100,
                  },
                  {
                    displayName: "Required",
                    name: "required",
                    type: "boolean",
                    default: false,
                  },
                  {
                    displayName: "List Items (JSON)",
                    name: "listItems",
                    type: "json",
                    default:
                      '[{"text": "Option 1", "value": "option1"}, {"text": "Option 2", "value": "option2"}]',
                  },
                ],
              },
              {
                name: "fullNameTabs",
                displayName: "Full Name Tabs",
                values: [
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
                    default: "",
                  },
                  {
                    displayName: "Y Position",
                    name: "yPosition",
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
                    default: "",
                  },
                  {
                    displayName: "Y Position",
                    name: "yPosition",
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
                    default: "",
                  },
                  {
                    displayName: "Y Position",
                    name: "yPosition",
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
                    default: "",
                  },
                  {
                    displayName: "Y Position",
                    name: "yPosition",
                    type: "string",
                    default: "",
                  },
                ],
              },
              {
                name: "numberTabs",
                displayName: "Number Tabs",
                values: [
                  {
                    displayName: "Tab Label",
                    name: "tabLabel",
                    type: "string",
                    default: "",
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
                    default: "",
                  },
                  {
                    displayName: "Y Position",
                    name: "yPosition",
                    type: "string",
                    default: "",
                  },
                  {
                    displayName: "Width",
                    name: "width",
                    type: "number",
                    default: 100,
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
                name: "dateTabs",
                displayName: "Date Tabs",
                values: [
                  {
                    displayName: "Tab Label",
                    name: "tabLabel",
                    type: "string",
                    default: "",
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
                    default: "",
                  },
                  {
                    displayName: "Y Position",
                    name: "yPosition",
                    type: "string",
                    default: "",
                  },
                  {
                    displayName: "Width",
                    name: "width",
                    type: "number",
                    default: 100,
                  },
                  {
                    displayName: "Required",
                    name: "required",
                    type: "boolean",
                    default: false,
                  },
                ],
              },
              {
                name: "noteTabs",
                displayName: "Note Tabs",
                values: [
                  {
                    displayName: "Value",
                    name: "value",
                    type: "string",
                    default: "",
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
                    default: "",
                  },
                  {
                    displayName: "Y Position",
                    name: "yPosition",
                    type: "string",
                    default: "",
                  },
                  {
                    displayName: "Width",
                    name: "width",
                    type: "number",
                    default: 200,
                  },
                  {
                    displayName: "Height",
                    name: "height",
                    type: "number",
                    default: 50,
                  },
                ],
              },
              {
                name: "approveTabs",
                displayName: "Approve Tabs",
                values: [
                  {
                    displayName: "Button Text",
                    name: "buttonText",
                    type: "string",
                    default: "Approve",
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
                    default: "",
                  },
                  {
                    displayName: "Y Position",
                    name: "yPosition",
                    type: "string",
                    default: "",
                  },
                ],
              },
              {
                name: "declineTabs",
                displayName: "Decline Tabs",
                values: [
                  {
                    displayName: "Button Text",
                    name: "buttonText",
                    type: "string",
                    default: "Decline",
                  },
                  {
                    displayName: "Decline Reason",
                    name: "declineReason",
                    type: "string",
                    default: "",
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
                    default: "",
                  },
                  {
                    displayName: "Y Position",
                    name: "yPosition",
                    type: "string",
                    default: "",
                  },
                ],
              },
            ],
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
          {
            displayName: "Note",
            name: "note",
            type: "string",
            default: "",
          },
          {
            displayName: "Email Notification",
            name: "emailNotification",
            type: "fixedCollection",
            default: {},
            options: [
              {
                name: "settings",
                displayName: "Settings",
                values: [
                  {
                    displayName: "Email Subject",
                    name: "emailSubject",
                    type: "string",
                    default: "",
                  },
                  {
                    displayName: "Email Body",
                    name: "emailBody",
                    type: "string",
                    typeOptions: {
                      rows: 4,
                    },
                    default: "",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "certifiedDeliveries",
        displayName: "Certified Deliveries",
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
          {
            displayName: "Note",
            name: "note",
            type: "string",
            default: "",
          },
        ],
      },
      {
        name: "agents",
        displayName: "Agents",
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
        name: "editors",
        displayName: "Editors",
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
        name: "intermediaries",
        displayName: "Intermediaries",
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
    displayName: "Custom Fields",
    name: "customFields",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    placeholder: "Add Custom Field",
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
            displayName: 'List Items (Comma-Separated)',
            name: "listItems",
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
    displayName: "Notification",
    name: "notification",
    type: "fixedCollection",
    default: {},
    placeholder: "Add Notification Settings",
    options: [
      {
        name: "reminders",
        displayName: "Reminders",
        values: [
          {
            displayName: "Reminder Enabled",
            name: "reminderEnabled",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Reminder Delay (Days)",
            name: "reminderDelay",
            type: "number",
            default: 1,
          },
          {
            displayName: "Reminder Frequency (Days)",
            name: "reminderFrequency",
            type: "number",
            default: 1,
          },
        ],
      },
      {
        name: "expirations",
        displayName: "Expirations",
        values: [
          {
            displayName: "Expire Enabled",
            name: "expireEnabled",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Expire After (Days)",
            name: "expireAfter",
            type: "number",
            default: 120,
          },
          {
            displayName: "Expire Warn (Days)",
            name: "expireWarn",
            type: "number",
            default: 7,
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
        displayName: "Allow View History",
        name: "allowViewHistory",
        type: "boolean",
        default: true,
      },
      {
        displayName: "Authoritative Copy",
        name: "authoritativeCopy",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Auto Match",
        name: "autoMatch",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Auto Match Specified By User",
        name: "autoMatchSpecifiedByUser",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Auto Navigation",
        name: "autoNavigation",
        type: "boolean",
        default: true,
      },
      {
        displayName: "Brand ID",
        name: "brandId",
        type: "string",
        default: "",
      },
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
      },
      {
        displayName: "Disable Responsive Document",
        name: "disableResponsiveDocument",
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
        displayName: "Message Lock",
        name: "messageLock",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Recipients Lock",
        name: "recipientsLock",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Shared",
        name: "shared",
        type: "options",
        default: "false",
        options: SHARED_TYPE_OPTIONS,
      },
      {
        displayName: "Show Initial Conditional Fields",
        name: "showInitialConditionalFields",
        type: "boolean",
        default: false,
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

function buildTabs(tabsData: IDataObject): IDataObject {
  const tabs: IDataObject = {};
  const tabTypes = [
    "signHereTabs",
    "initialHereTabs",
    "dateSignedTabs",
    "textTabs",
    "checkboxTabs",
    "radioGroupTabs",
    "listTabs",
    "fullNameTabs",
    "emailTabs",
    "companyTabs",
    "titleTabs",
    "numberTabs",
    "dateTabs",
    "noteTabs",
    "approveTabs",
    "declineTabs",
  ];

  tabTypes.forEach((tabType) => {
    if (tabsData[tabType] && Array.isArray(tabsData[tabType])) {
      tabs[tabType] = (tabsData[tabType] as IDataObject[]).map((tab) => {
        const processedTab: IDataObject = {};
        Object.entries(tab).forEach(([key, value]) => {
          if (value !== "" && value !== undefined && value !== null) {
            if (key === "radios" || key === "listItems") {
              if (typeof value === "string") {
                try {
                  processedTab[key] = JSON.parse(value);
                } catch {
                  if (key === "listItems") {
                    processedTab[key] = (value as string)
                      .split(",")
                      .map((item) => ({
                        text: item.trim(),
                        value: item.trim(),
                      }));
                  }
                }
              } else {
                processedTab[key] = value;
              }
            } else {
              processedTab[key] = value;
            }
          }
        });
        return processedTab;
      });
    }
  });

  return tabs;
}

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
  const customFieldsData = this.getNodeParameter(
    "customFields",
    index,
    {},
  ) as IDataObject;
  const notificationData = this.getNodeParameter(
    "notification",
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
  const recipientTypes = [
    "signers",
    "carbonCopies",
    "certifiedDeliveries",
    "agents",
    "editors",
    "intermediaries",
  ];

  recipientTypes.forEach((type) => {
    if (recipientsData[type] && Array.isArray(recipientsData[type])) {
      recipients[type] = (recipientsData[type] as IDataObject[]).map(
        (recipient) => {
          const processedRecipient: IDataObject = {};
          Object.entries(recipient).forEach(([key, value]) => {
            if (key === "tabs" && value && typeof value === "object") {
              processedRecipient.tabs = buildTabs(value as IDataObject);
            } else if (
              key === "emailNotification" &&
              value &&
              typeof value === "object"
            ) {
              const emailNotifData = value as IDataObject;
              if (
                emailNotifData.settings &&
                Array.isArray(emailNotifData.settings)
              ) {
                processedRecipient.emailNotification = emailNotifData
                  .settings[0] as IDataObject;
              }
            } else if (value !== "" && value !== undefined && value !== null) {
              processedRecipient[key] = value;
            }
          });
          return processedRecipient;
        },
      );
    }
  });

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
    "allowViewHistory",
    "authoritativeCopy",
    "autoMatch",
    "autoMatchSpecifiedByUser",
    "autoNavigation",
    "brandId",
    "disableResponsiveDocument",
    "enforceSignerVisibility",
    "folderId",
    "folderName",
    "messageLock",
    "recipientsLock",
    "showInitialConditionalFields",
  ];

  optionalDefFields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      envelopeTemplateDefinition[field] = additionalFields[field];
    }
  });

  if (Object.keys(recipients).length > 0) {
    envelopeTemplateDefinition.recipients = recipients;
  }

  const customFields: IDataObject = {};
  if (
    customFieldsData.textCustomFields &&
    Array.isArray(customFieldsData.textCustomFields)
  ) {
    customFields.textCustomFields = (
      customFieldsData.textCustomFields as IDataObject[]
    ).map((field) => ({
      name: field.name,
      value: field.value || "",
      required: field.required ? "true" : "false",
      show: field.show ? "true" : "false",
    }));
  }
  if (
    customFieldsData.listCustomFields &&
    Array.isArray(customFieldsData.listCustomFields)
  ) {
    customFields.listCustomFields = (
      customFieldsData.listCustomFields as IDataObject[]
    ).map((field) => ({
      name: field.name,
      value: field.value || "",
      listItems:
        typeof field.listItems === "string"
          ? field.listItems.split(",").map((item: string) => item.trim())
          : field.listItems,
      required: field.required ? "true" : "false",
      show: field.show ? "true" : "false",
    }));
  }
  if (Object.keys(customFields).length > 0) {
    envelopeTemplateDefinition.customFields = customFields;
  }

  const notification: IDataObject = {};
  if (notificationData.reminders && Array.isArray(notificationData.reminders)) {
    const reminderSettings = notificationData.reminders[0] as IDataObject;
    if (reminderSettings) {
      notification.reminders = {
        reminderEnabled: reminderSettings.reminderEnabled ? "true" : "false",
        reminderDelay: String(reminderSettings.reminderDelay || 1),
        reminderFrequency: String(reminderSettings.reminderFrequency || 1),
      };
    }
  }
  if (
    notificationData.expirations &&
    Array.isArray(notificationData.expirations)
  ) {
    const expirationSettings = notificationData.expirations[0] as IDataObject;
    if (expirationSettings) {
      notification.expirations = {
        expireEnabled: expirationSettings.expireEnabled ? "true" : "false",
        expireAfter: String(expirationSettings.expireAfter || 120),
        expireWarn: String(expirationSettings.expireWarn || 7),
      };
    }
  }
  if (Object.keys(notification).length > 0) {
    envelopeTemplateDefinition.notification = notification;
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
