import type { IDataObject, INode, INodeExecutionData } from "n8n-workflow";

export interface MockExecuteFunctionsOptions {
  nodeParameters?: Record<string, unknown>;
  credentials?: Record<string, unknown>;
  inputData?: INodeExecutionData[];
}

export function createMockNode(): INode {
  return {
    id: "test-node-id",
    name: "Docusign",
    type: "n8n-nodes-docusign.docusign",
    typeVersion: 1,
    position: [0, 0],
    parameters: {},
  };
}

export function createMockExecuteFunctions(options: MockExecuteFunctionsOptions = {}) {
  const {
    nodeParameters = {},
    credentials = {
      accessToken: "mock-access-token",
      metadataUrl: "https://account-d.docusign.com/oauth/userinfo",
    },
    inputData = [{ json: {} }],
  } = options;

  const mockHelpers = {
    returnJsonArray: (data: IDataObject | IDataObject[]): INodeExecutionData[] => {
      const arr = Array.isArray(data) ? data : [data];
      return arr.map((json) => ({ json }));
    },
    requestOAuth2: async () => ({}),
  };

  return {
    getNode: () => createMockNode(),
    getNodeParameter: (name: string, index: number, defaultValue?: unknown) => {
      return nodeParameters[name] ?? defaultValue;
    },
    getCredentials: async () => credentials,
    getInputData: () => inputData,
    helpers: mockHelpers,
  };
}

export const mockDocusignAccount = {
  account_id: "test-account-123",
  account_name: "Test Account",
  base_uri: "https://demo.docusign.net",
  is_default: true,
};

export const mockMetadata = {
  accounts: [mockDocusignAccount],
  name: "Test User",
  email: "test@example.com",
};
