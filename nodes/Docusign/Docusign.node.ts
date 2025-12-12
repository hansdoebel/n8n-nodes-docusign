import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";

import * as Envelopes from "./resources/envelopes";
import * as EnvelopeEnvelopes from "./resources/envelopes/envelopes";

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
      options: [
        { name: "Envelopes", value: "envelopes" },
        { name: "Templates", value: "templates" },
      ],
    },
    {
      displayName: "Category",
      name: "category",
      type: "options",
      displayOptions: {
        show: { resource: ["envelopes", "templates"] },
      },
      options: [
        { name: "Envelopes", value: "envelopes" },
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
        { name: "Create", value: "create", action: "Create a template" },
        { name: "Get", value: "get", action: "Get a template" },
        { name: "List", value: "list", action: "List many templates" },
      ],
      default: "get",
    },
    {
      displayName: "Operation",
      name: "operation",
      type: "options",
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: ["envelopes"],
          category: ["envelopes"],
        },
      },
      options: [
        { name: "Create", value: "create", action: "Create an envelope" },
      ],
      default: "create",
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
    ...EnvelopeEnvelopes.envelopeCreateDescription.map((prop) => ({
      ...prop,
      displayOptions: {
        ...prop.displayOptions,
        show: {
          ...prop.displayOptions?.show,
          resource: ["envelopes"],
          category: ["envelopes"],
          operation: ["create"],
        },
      },
    })),
    ...TemplateTemplates.templateCreateDescription.map((prop) => ({
      ...prop,
      displayOptions: {
        ...prop.displayOptions,
        show: {
          ...prop.displayOptions?.show,
          resource: ["templates"],
          category: ["templates"],
          operation: ["create"],
        },
      },
    })),
    ...TemplateTemplates.templateGetDescription.map((prop) => ({
      ...prop,
      displayOptions: {
        ...prop.displayOptions,
        show: {
          ...prop.displayOptions?.show,
          resource: ["templates"],
          category: ["templates"],
          operation: ["get"],
        },
      },
    })),
    ...TemplateTemplates.templateListDescription.map((prop) => ({
      ...prop,
      displayOptions: {
        ...prop.displayOptions,
        show: {
          ...prop.displayOptions?.show,
          resource: ["templates"],
          category: ["templates"],
          operation: ["list"],
        },
      },
    })),
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
        } else if (resource === "envelopes") {
          if (
            category === "envelopes" &&
            operation in Envelopes.envelopes.envelopes
          ) {
            responseData =
              await (Envelopes.envelopes.envelopes as any)[operation].execute
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
