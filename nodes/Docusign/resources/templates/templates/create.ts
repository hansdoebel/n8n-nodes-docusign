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

const TEMPLATE_STATUS_OPTIONS = [
  { name: "Draft", value: TemplateStatus.DRAFT },
  { name: "Active", value: TemplateStatus.ACTIVE },
];

const SHARED_ACCESS_OPTIONS = [
  { name: "None", value: "none" },
  { name: "Read", value: "read" },
  { name: "Write", value: "write" },
  { name: "Admin", value: "admin" },
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
    displayName: "Document File",
    name: "documentFile",
    type: "string",
    required: true,
    default: "",
    description: "The document file to upload (JSON binary data)",
    displayOptions: {
      show: {
        resource: ["templates"],
        category: ["templates"],
        operation: ["create"],
      },
    },
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
        displayName: "Status",
        name: "status",
        type: "options",
        default: TemplateStatus.ACTIVE,
        options: TEMPLATE_STATUS_OPTIONS,
        description: "The status of the template",
      },
      {
        displayName: "Email Subject",
        name: "emailSubject",
        type: "string",
        default: "",
        description: "The email subject to use in sending the template",
      },
      {
        displayName: "Email Message",
        name: "emailMessage",
        type: "string",
        default: "",
        description: "The email message to use in sending the template",
      },
      {
        displayName: "Shared",
        name: "shared",
        type: "boolean",
        default: false,
        description: "Whether the template should be shared with other users",
      },
      {
        displayName: "Owner",
        name: "owner",
        type: "string",
        default: "",
        description: "The email of the template owner",
      },
      {
        displayName: "Shared Access Level",
        name: "sharedAccessLevel",
        type: "options",
        default: "read",
        options: SHARED_ACCESS_OPTIONS,
        description: "The access level for shared users",
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
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const body: IDataObject = {
    name: templateName,
    description: templateDescription,
  };

  if (additionalFields.status) {
    body.status = additionalFields.status;
  } else {
    body.status = TemplateStatus.ACTIVE;
  }

  if (additionalFields.emailSubject) {
    body.emailSubject = additionalFields.emailSubject;
  }

  if (additionalFields.emailMessage) {
    body.emailMessage = additionalFields.emailMessage;
  }

  if (additionalFields.shared) {
    body.shared = additionalFields.shared;
  }

  if (additionalFields.owner) {
    body.owner = additionalFields.owner;
  }

  if (additionalFields.sharedAccessLevel) {
    body.sharedAccessLevel = additionalFields.sharedAccessLevel;
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
