import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";

export const description: INodeProperties[] = [
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Count",
        name: "count",
        type: "number",
        default: 100,
        typeOptions: {
          minValue: 1,
        },
      },
      {
        displayName: "Group Name",
        name: "group_name",
        type: "string",
        default: "",
      },
      {
        displayName: "Group Type",
        name: "group_type",
        type: "options",
        default: "adminGroup",
        options: [
          { name: "Admin Group", value: "adminGroup" },
          { name: "Custom Group", value: "customGroup" },
          { name: "Everyone Group", value: "everyoneGroup" },
        ],
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
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const qs: IDataObject = {};

  const optionalParams = [
    "start_position",
    "count",
    "group_name",
    "group_type",
    "search_text",
  ];

  optionalParams.forEach((param) => {
    if (additionalFields[param] !== undefined) {
      qs[param] = additionalFields[param];
    }
  });

  const response = await docusignApiRequest.call(
    this,
    "GET",
    "/groups",
    {},
    qs,
  );

  return this.helpers.returnJsonArray(response.groups || []);
}
