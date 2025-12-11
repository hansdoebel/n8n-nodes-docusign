import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";

import * as Templates from "./resources/templates";

import * as TemplateTemplates from "./resources/templates/templates";

const DocuSignDescription: INodeTypeDescription = {
  displayName: "DocuSign",
  name: "docusign",
  icon: "file:docusign.svg",
  group: ["input"],
  version: 1,
  subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
  description: "Work with the DocuSign API",
  defaults: { name: "DocuSign" },
  inputs: ["main"],
  outputs: ["main"],
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
      default: "templates",
      options: [{ name: "Template", value: "templates" }],
    },
    {
      displayName: "Category",
      name: "category",
      type: "options",
      displayOptions: {
        show: { resource: ["templates"] },
      },
      options: [
        { name: "Templates", value: "templates" },
        { name: "Custom Fields", value: "customFields" },
      ],
      default: "templates",
    },
    {
      displayName: "Operation",
      name: "operation",
      type: "options",
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: ["templates"],
          category: ["templates"],
        },
      },
      options: [
        { name: "Get", value: "get", action: "Get a templates" },
        { name: "Create", value: "create", action: "Create a templates" },
      ],
      default: "get",
    },
    {
      displayName: "Use Default Account",
      name: "useDefaultAccount",
      type: "boolean",
      default: true,
      description: "Whether to use the default DocuSign account",
    },
    {
      displayName: "Account ID",
      name: "accountId",
      type: "string",
      default: "",
      description:
        "The DocuSign account ID (used if not using default account)",
      displayOptions: {
        show: {
          useDefaultAccount: [false],
        },
      },
    },
    ...TemplateTemplates.templateGetDescription,
    ...TemplateTemplates.templateCreateDescription,
  ],
};

export class Docusign implements INodeType {
  description: INodeTypeDescription = DocuSignDescription;

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const resource = this.getNodeParameter("resource", i) as string;
      const category = this.getNodeParameter("category", i, "") as string;
      const operation = this.getNodeParameter("operation", i) as string;

      let responseData;

      try {
        if (resource === "templates") {
          if (
            category === "templates" &&
            operation in Templates.templates.templates
          ) {
            responseData =
              await (Templates.templates.templates as any)[operation].execute
                .call(
                  this,
                  i,
                );
          } else {
            throw new NodeOperationError(
              this.getNode(),
              `Operation "${operation}" not supported for category "${category}".`,
            );
          }
        } else {
          throw new NodeOperationError(
            this.getNode(),
            `Resource "${resource}" not recognized.`,
          );
        }

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
