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
    displayName: "Signature ID",
    name: "signatureId",
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
        displayName: "Signature Name",
        name: "signatureName",
        type: "string",
        default: "",
      },
      {
        displayName: "Signature Font",
        name: "signatureFont",
        type: "string",
        default: "",
      },
      {
        displayName: "Signature Initials",
        name: "signatureInitials",
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
  const signatureId = this.getNodeParameter("signatureId", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;

  const body: IDataObject = {};

  const fields = ["signatureName", "signatureFont", "signatureInitials"];

  fields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      body[field] = additionalFields[field];
    }
  });

  const response = await docusignApiRequest.call(
    this,
    "PUT",
    `${API_ENDPOINTS.SIGNATURE}/${signatureId}`,
    body,
  );

  return this.helpers.returnJsonArray([response as IDataObject]);
}
