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
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Encoding",
        name: "encoding",
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

  if (additionalFields.encoding) {
    qs.encoding = additionalFields.encoding;
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    API_ENDPOINTS.DIAGNOSTICS,
    {},
    qs,
  );

  return this.helpers.returnJsonArray(response.apiRequestLogs || []);
}
