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
        displayName: "Count",
        name: "count",
        type: "number",
        default: 100,
        typeOptions: {
          minValue: 1,
        },
      },
      {
        displayName: "Start Position",
        name: "start_position",
        type: "number",
        default: 0,
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        default: "queued",
        options: [
          { name: "Queued", value: "queued" },
          { name: "Processing", value: "processing" },
          { name: "Sent", value: "sent" },
          { name: "Failed", value: "failed" },
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

  const optionalParams = ["count", "start_position", "status"];

  optionalParams.forEach((param) => {
    if (additionalFields[param] !== undefined) {
      qs[param] = additionalFields[param];
    }
  });

  const response = await docusignApiRequest.call(
    this,
    "GET",
    API_ENDPOINTS.BULK_ENVELOPES,
    {},
    qs,
  );

  return this.helpers.returnJsonArray(response.bulkEnvelopeBatches || []);
}
