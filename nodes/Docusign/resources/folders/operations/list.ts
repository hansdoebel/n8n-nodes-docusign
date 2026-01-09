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
        displayName: "Include Items",
        name: "include_items",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Start Position",
        name: "start_position",
        type: "number",
        default: 0,
      },
      {
        displayName: "Template",
        name: "template",
        type: "options",
        default: "include",
        options: [
          { name: "Include", value: "include" },
          { name: "Only", value: "only" },
        ],
      },
      {
        displayName: "User Filter",
        name: "user_filter",
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
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const qs: IDataObject = {};

  const optionalParams = [
    "include_items",
    "start_position",
    "count",
    "template",
    "user_filter",
  ];

  optionalParams.forEach((param) => {
    if (additionalFields[param] !== undefined) {
      qs[param] = additionalFields[param];
    }
  });

  const response = await docusignApiRequest.call(
    this,
    "GET",
    "/folders",
    {},
    qs,
  );

  return this.helpers.returnJsonArray(response.folders || []);
}
