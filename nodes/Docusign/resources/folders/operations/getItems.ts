import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";

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
        displayName: "Owner Email",
        name: "owner_email",
        type: "string",
        default: "",
      },
      {
        displayName: "Owner Name",
        name: "owner_name",
        type: "string",
        default: "",
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
    "from_date",
    "to_date",
    "search_text",
    "start_position",
    "owner_name",
    "owner_email",
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

  const items = [
    ...(response.envelopeItems || []),
    ...(response.folderItems || []),
  ];

  return this.helpers.returnJsonArray(items);
}
