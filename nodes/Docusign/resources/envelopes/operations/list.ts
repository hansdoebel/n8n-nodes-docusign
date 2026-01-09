import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";
import { EnvelopeStatus, SORT_ORDER_OPTIONS } from "@utils/constants";

export const description: INodeProperties[] = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    description: "Whether to return all results or only up to a given limit",
    default: false,
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    description: "Max number of results to return",
    default: 50,
    displayOptions: {
      show: {
        returnAll: [false],
      },
    },
    typeOptions: {
      minValue: 1,
    },
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Custom Field",
        name: "custom_field",
        type: "string",
        default: "",
      },
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: "",
      },
      {
        displayName: "Folder IDs",
        name: "folder_ids",
        type: "string",
        default: "",
      },
      {
        displayName: "From Date",
        name: "from_date",
        type: "dateTime",
        default: "",
      },
      {
        displayName: "Include",
        name: "include",
        type: "multiOptions",
        default: [],
        options: [
          { name: "Custom Fields", value: "custom_fields" },
          { name: "Documents", value: "documents" },
          { name: "Folders", value: "folders" },
          { name: "Recipients", value: "recipients" },
        ],
      },
      {
        displayName: "Order",
        name: "order",
        type: "options",
        default: "asc",
        options: SORT_ORDER_OPTIONS,
      },
      {
        displayName: "Order By",
        name: "order_by",
        type: "options",
        default: "created",
        options: [
          { name: "Completed", value: "completed" },
          { name: "Created", value: "created" },
          { name: "Sent", value: "sent" },
          { name: "Status Changed", value: "status_changed" },
          { name: "Subject", value: "subject" },
        ],
      },
      {
        displayName: "Search Text",
        name: "search_text",
        type: "string",
        default: "",
      },
      {
        displayName: "Status",
        name: "status",
        type: "multiOptions",
        default: [],
        options: [
          { name: "Created", value: EnvelopeStatus.CREATED },
          { name: "Sent", value: EnvelopeStatus.SENT },
          { name: "Delivered", value: EnvelopeStatus.DELIVERED },
          { name: "Signed", value: EnvelopeStatus.SIGNED },
          { name: "Completed", value: EnvelopeStatus.COMPLETED },
          { name: "Declined", value: EnvelopeStatus.DECLINED },
          { name: "Voided", value: EnvelopeStatus.VOIDED },
          { name: "Deleted", value: EnvelopeStatus.DELETED },
        ],
      },
      {
        displayName: "To Date",
        name: "to_date",
        type: "dateTime",
        default: "",
      },
      {
        displayName: "User Name",
        name: "user_name",
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
  const returnAll = this.getNodeParameter("returnAll", index) as boolean;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const qs: IDataObject = {};

  if (!returnAll) {
    const limit = this.getNodeParameter("limit", index) as number;
    qs.count = limit;
  }

  const optionalParams = [
    "from_date",
    "to_date",
    "folder_ids",
    "search_text",
    "order",
    "order_by",
    "email",
    "user_name",
    "custom_field",
  ];

  optionalParams.forEach((param) => {
    if (additionalFields[param]) {
      qs[param] = additionalFields[param];
    }
  });

  if (additionalFields.status && Array.isArray(additionalFields.status)) {
    qs.status = (additionalFields.status as string[]).join(",");
  }

  if (additionalFields.include && Array.isArray(additionalFields.include)) {
    qs.include = (additionalFields.include as string[]).join(",");
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    "/envelopes",
    {},
    qs,
  );

  const envelopes = response.envelopes || [];

  if (returnAll) {
    return this.helpers.returnJsonArray(envelopes);
  }

  return this.helpers.returnJsonArray(envelopes);
}
