import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";
import { SORT_ORDER_OPTIONS } from "@utils/constants";

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
        displayName: "Created From Date",
        name: "created_from_date",
        type: "dateTime",
        default: "",
      },
      {
        displayName: "Created To Date",
        name: "created_to_date",
        type: "dateTime",
        default: "",
      },
      {
        displayName: "Folder IDs",
        name: "folder_ids",
        type: "string",
        default: "",
      },
      {
        displayName: "Folder Types",
        name: "folder_types",
        type: "options",
        default: "templates",
        options: [
          { name: "Templates", value: "templates" },
          { name: "Templates Root", value: "templates_root" },
          { name: "Recycle Bin", value: "recyclebin" },
        ],
      },
      {
        displayName: "Include",
        name: "include",
        type: "multiOptions",
        default: [],
        options: [
          { name: "Advanced Templates", value: "advanced_templates" },
          { name: "Custom Fields", value: "custom_fields" },
          { name: "Documents", value: "documents" },
          {
            name: "Favorite Template Status",
            value: "favorite_template_status",
          },
          { name: "Folders", value: "folders" },
          { name: "Notifications", value: "notifications" },
          { name: "PowerForms", value: "powerforms" },
          { name: "Recipients", value: "recipients" },
        ],
      },
      {
        displayName: "Is Deleted",
        name: "is_deleted",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Modified From Date",
        name: "modified_from_date",
        type: "dateTime",
        default: "",
      },
      {
        displayName: "Modified To Date",
        name: "modified_to_date",
        type: "dateTime",
        default: "",
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
        default: "name",
        options: [
          { name: "Name", value: "name" },
          { name: "Modified", value: "modified" },
          { name: "Used", value: "used" },
        ],
      },
      {
        displayName: "Search Text",
        name: "search_text",
        type: "string",
        default: "",
      },
      {
        displayName: "Shared By Me",
        name: "shared_by_me",
        type: "boolean",
        default: false,
      },
      {
        displayName: "User Filter",
        name: "user_filter",
        type: "options",
        default: "owned_by_me",
        options: [
          { name: "Owned by Me", value: "owned_by_me" },
          { name: "Shared with Me", value: "shared_with_me" },
          { name: "All", value: "all" },
        ],
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
    "created_from_date",
    "created_to_date",
    "modified_from_date",
    "modified_to_date",
    "folder_ids",
    "folder_types",
    "order",
    "order_by",
    "search_text",
    "user_filter",
    "shared_by_me",
    "is_deleted",
  ];

  optionalParams.forEach((param) => {
    if (additionalFields[param] !== undefined) {
      qs[param] = additionalFields[param];
    }
  });

  if (additionalFields.include && Array.isArray(additionalFields.include)) {
    qs.include = (additionalFields.include as string[]).join(",");
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    "/templates",
    {},
    qs,
  );

  const templates = response.envelopeTemplates || [];

  return this.helpers.returnJsonArray(templates);
}
