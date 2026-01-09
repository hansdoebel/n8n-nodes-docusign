import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "../../../utils";
import { API_ENDPOINTS } from "../../../utils/constants";

export const description: INodeProperties[] = [
  {
    displayName: "Custom Tab ID",
    name: "customTabId",
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
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
      },
      {
        displayName: "Required",
        name: "required",
        type: "boolean",
        default: false,
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const customTabId = this.getNodeParameter("customTabId", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const body: IDataObject = {};

  const fields = ["name", "required", "editable", "bold", "font", "fontSize"];

  fields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      body[field] = additionalFields[field];
    }
  });

  const response = await docusignApiRequest.call(
    this,
    "PUT",
    `${API_ENDPOINTS.CUSTOM_TABS}/${customTabId}`,
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
