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
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    default: "",
  },
  {
    displayName: "Type",
    name: "type",
    type: "options",
    required: true,
    default: "text",
    options: [
      { name: "Checkbox", value: "checkbox" },
      { name: "Date", value: "date" },
      { name: "List", value: "list" },
      { name: "Number", value: "number" },
      { name: "Text", value: "text" },
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
        displayName: "Bold",
        name: "bold",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Editable",
        name: "editable",
        type: "boolean",
        default: true,
      },
      {
        displayName: "Font",
        name: "font",
        type: "string",
        default: "Arial",
      },
      {
        displayName: "Font Size",
        name: "fontSize",
        type: "string",
        default: "Size12",
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
        displayName: "Width",
        name: "width",
        type: "number",
        default: 100,
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const name = this.getNodeParameter("name", index) as string;
  const type = this.getNodeParameter("type", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const body: IDataObject = {
    name,
    type,
  };

  const fields = [
    "required",
    "editable",
    "bold",
    "font",
    "fontSize",
    "width",
    "height",
  ];

  fields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      body[field] = additionalFields[field];
    }
  });

  const response = await docusignApiRequest.call(
    this,
    "POST",
    API_ENDPOINTS.CUSTOM_TABS,
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
