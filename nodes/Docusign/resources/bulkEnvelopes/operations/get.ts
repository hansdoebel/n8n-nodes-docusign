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
    displayName: "Bulk Send Batch ID",
    name: "bulkSendBatchId",
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
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const bulkSendBatchId = this.getNodeParameter(
    "bulkSendBatchId",
    index,
  ) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const qs: IDataObject = {};

  if (additionalFields.count !== undefined) {
    qs.count = additionalFields.count;
  }

  if (additionalFields.start_position !== undefined) {
    qs.start_position = additionalFields.start_position;
  }

  const response = await docusignApiRequest.call(
    this,
    "GET",
    `${API_ENDPOINTS.BULK_ENVELOPES}/${bulkSendBatchId}`,
    {},
    qs,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
