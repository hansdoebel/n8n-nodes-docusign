import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils/GenericFunctions";

export const templateListDescription: INodeProperties[] = [
  {
    displayName: "Account ID",
    name: "accountId",
    type: "string",
    default: "",
    description: "The external account number (int) or account ID GUID",
    displayOptions: {
      show: {
        resource: ["templates"],
        category: ["templates"],
        operation: ["list"],
        useDefaultAccount: [false],
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
        operation: ["list"],
      },
    },
    options: [
      {
        displayName: "Count",
        name: "count",
        type: "string",
        default: "",
        description: "The maximum number of results to return",
      },
      {
        displayName: "Start Position",
        name: "start_position",
        type: "string",
        default: "",
        description:
          "The zero-based index of the result from which to start returning results",
      },
      {
        displayName: "Created From Date",
        name: "created_from_date",
        type: "dateTime",
        default: "",
        description: "Lists templates created on or after this date",
      },
      {
        displayName: "Created To Date",
        name: "created_to_date",
        type: "dateTime",
        default: "",
        description: "Lists templates modified before this date",
      },
      {
        displayName: "Folder IDs",
        name: "folder_ids",
        type: "string",
        default: "",
        description: "A comma-separated list of folder ID GUIDs",
      },
      {
        displayName: "Folder Types",
        name: "folder_types",
        type: "options",
        options: [
          {
            name: "Templates",
            value: "templates",
          },
          {
            name: "Templates Root",
            value: "templates_root",
          },
          {
            name: "Recycle Bin",
            value: "recylebin",
          },
        ],
        default: 'templates',
        description: "The type of folder to return templates for",
      },
      {
        displayName: "Include",
        name: "include",
        type: "multiOptions",
        options: [
          {
            name: "PowerForms",
            value: "powerforms",
          },
          {
            name: "Documents",
            value: "documents",
          },
          {
            name: "Folders",
            value: "folders",
          },
          {
            name: "Favorite Template Status",
            value: "favorite_template_status",
          },
          {
            name: "Advanced Templates",
            value: "advanced_templates",
          },
          {
            name: "Recipients",
            value: "recipients",
          },
          {
            name: "Custom Fields",
            value: "custom_fields",
          },
          {
            name: "Notifications",
            value: "notifications",
          },
        ],
        default: [],
        description:
          "Additional template attributes to include in the response",
      },
      {
        displayName: "Order",
        name: "order",
        type: "options",
        options: [
          {
            name: "Ascending",
            value: "asc",
          },
          {
            name: "Descending",
            value: "desc",
          },
        ],
        default: 'asc',
        description: "Specifies the sort order of the search results",
      },
      {
        displayName: "Order By",
        name: "order_by",
        type: "options",
        options: [
          {
            name: "Name",
            value: "name",
          },
          {
            name: "Modified",
            value: "modified",
          },
          {
            name: "Used",
            value: "used",
          },
        ],
        default: 'name',
        description: "Specifies how the search results are listed",
      },
      {
        displayName: "Search Text",
        name: "search_text",
        type: "string",
        default: "",
        description:
          "The text to use to search the names of templates (max 48 characters)",
      },
      {
        displayName: "User Filter",
        name: "user_filter",
        type: "options",
        options: [
          {
            name: "Owned by Me",
            value: "owned_by_me",
          },
          {
            name: "Shared with Me",
            value: "shared_with_me",
          },
          {
            name: "All",
            value: "all",
          },
        ],
        default: 'owned_by_me',
        description: "Filters the templates in the response",
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

  const endpoint = `/templates`;
  const qs: IDataObject = {};

  const optionalParams = [
    "count",
    "start_position",
    "created_from_date",
    "created_to_date",
    "folder_ids",
    "folder_types",
    "include",
    "order",
    "order_by",
    "search_text",
    "user_filter",
  ];

  optionalParams.forEach((param) => {
    if (additionalFields[param]) {
      if (param === "include" && Array.isArray(additionalFields[param])) {
        qs[param] = (additionalFields[param] as string[]).join(",");
      } else {
        qs[param] = additionalFields[param];
      }
    }
  });

  const response = await docusignApiRequest.call(this, "GET", endpoint, {}, qs);
  return this.helpers.returnJsonArray(response?.templates || [response]);
}
