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
        displayName: "From Date",
        name: "from_date",
        type: "dateTime",
        default: "",
      },
      {
        displayName: "To Date",
        name: "to_date",
        type: "dateTime",
        default: "",
      },
      {
        displayName: "Order",
        name: "order",
        type: "options",
        default: "asc",
        options: [
          { name: "Ascending", value: "asc" },
          { name: "Descending", value: "desc" },
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

  const optionalParams = ["from_date", "to_date", "order"];

  optionalParams.forEach((param) => {
    if (additionalFields[param]) {
      qs[param] = additionalFields[param];
    }
  });

  const response = await docusignApiRequest.call(
    this,
    "GET",
    API_ENDPOINTS.POWER_FORMS,
    {},
    qs,
  );

  return this.helpers.returnJsonArray(response.powerForms || []);
}
