import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";

import { allOperations, allResources } from "./resources";
import { resourceMetadata } from "./config/resourceMetadata";
import { buildAllOperationProperties } from "@utils/nodeBuilder";

const DocusignDescription: INodeTypeDescription = {
  displayName: "Docusign",
  name: "docusign",
  icon: "file:../../icons/docusign.svg",
  group: ["input"],
  version: 1,
  subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
  description: "Work with the Docusign API",
  defaults: { name: "Docusign" },
  inputs: ["main"],
  outputs: ["main"],
  usableAsTool: true,
  credentials: [
    {
      name: "docusignOAuth2Api",
      required: true,
      testedBy: "docusignApiTest",
    },
  ],
  properties: [
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      default: "envelopes",
      options: resourceMetadata.map((r) => ({
        name: r.displayName,
        value: r.key,
      })),
    },
    {
      displayName: "Use Default Account",
      name: "useDefaultAccount",
      type: "boolean",
      default: true,
    },
    {
      displayName: "Account ID",
      name: "accountId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          useDefaultAccount: [false],
        },
      },
    },
    ...allOperations.flat(),
    ...buildAllOperationProperties(allResources),
  ],
};

export class Docusign implements INodeType {
  description: INodeTypeDescription = DocusignDescription;

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const resource = this.getNodeParameter("resource", i) as string;
      const operation = this.getNodeParameter("operation", i) as string;

      try {
        const resourceObj = allResources[resource as keyof typeof allResources];

        if (!resourceObj) {
          throw new NodeOperationError(
            this.getNode(),
            `Resource "${resource}" not found.`,
          );
        }

        const operationFunc = (resourceObj as any)[operation];

        if (!operationFunc || !operationFunc.execute) {
          throw new NodeOperationError(
            this.getNode(),
            `Operation "${operation}" not found for resource "${resource}".`,
          );
        }

        const responseData = await operationFunc.execute.call(this, i);

        if (responseData) {
          returnData.push(...responseData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          items[i].json = { error: error.message };
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
