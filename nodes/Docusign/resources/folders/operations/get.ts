import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "../../../utils";

export const description: INodeProperties[] = [
  {
    displayName: "Folder ID",
    name: "folderId",
    type: "string",
    required: true,
    default: "",
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "From Date",
        name: "from_date",
        type: "dateTime",
        default: "",
      },
      {
        displayName: "Include Items",
        name: "include_items",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Include Recipients",
        name: "include_recipients",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Search Text",
        name: "search_text",
        type: "string",
        default: "",
      },
      {
        displayName: "Start Position",
        name: "start_position",
        type: "number",
        default: 0,
      },
      {
        displayName: "To Date",
        name: "to_date",
        type: "dateTime",
        default: "",
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const folderId = this.getNodeParameter("folderId", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const qs: IDataObject = {};

  const optionalParams = [
    "include_items",
    "start_position",
    "from_date",
    "to_date",
    "search_text",
    "include_recipients",
  ];

  optionalParams.forEach((param) => {
    if (additionalFields[param] !== undefined) {
      qs[param] = additionalFields[param];
    }
  });

  const response = await docusignApiRequest.call(
    this,
    "GET",
    `/folders/${folderId}`,
    {},
    qs,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
