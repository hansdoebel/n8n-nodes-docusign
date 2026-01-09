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
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Custom Type",
        name: "custom_type",
        type: "options",
        default: "all",
        options: [
          { name: "All", value: "all" },
          { name: "Date", value: "date" },
          { name: "List", value: "list" },
          { name: "Number", value: "number" },
          { name: "Text", value: "text" },
        ],
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

  if (additionalFields.custom_type) {
    qs.custom_type = additionalFields.custom_type;
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    API_ENDPOINTS.CUSTOM_TABS,
    {},
    qs,
  );

  return this.helpers.returnJsonArray(response.customTabs || []);
}
