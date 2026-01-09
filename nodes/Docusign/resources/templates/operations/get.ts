import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "../../../utils";

export const description: INodeProperties[] = [
  {
    displayName: "Template ID",
    name: "templateId",
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
        displayName: "Include",
        name: "include",
        type: "multiOptions",
        default: [],
        options: [
          { name: "Custom Fields", value: "custom_fields" },
          { name: "Documents", value: "documents" },
          { name: "Notifications", value: "notifications" },
          { name: "Recipients", value: "recipients" },
          { name: "Tabs", value: "tabs" },
        ],
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const templateId = this.getNodeParameter("templateId", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const qs: IDataObject = {};

  if (additionalFields.include && Array.isArray(additionalFields.include)) {
    qs.include = (additionalFields.include as string[]).join(",");
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    `/templates/${templateId}`,
    {},
    qs,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
