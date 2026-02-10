import { mock } from "bun:test";
import type { IDataObject, INode, INodeExecutionData } from "n8n-workflow";

export interface MockApiCall {
  method: string;
  endpoint: string;
  body: object;
  query?: IDataObject;
}

export interface MockExecuteContext {
  nodeParameters: Record<string, unknown>;
  apiResponse: unknown;
  apiCalls: MockApiCall[];
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

export function createMockExecuteContext(
  nodeParameters: Record<string, unknown>,
  apiResponse: unknown
): MockExecuteContext {
  return {
    nodeParameters,
    apiResponse,
    apiCalls: [],
  };
}

export function createMockExecuteFunctions(ctx: MockExecuteContext) {
  const mockHelpers = {
    returnJsonArray: (data: IDataObject | IDataObject[]): INodeExecutionData[] => {
      const arr = Array.isArray(data) ? data : [data];
      return arr.map((json) => ({ json }));
    },
    httpRequest: mock(async () => Buffer.from("mock-file-content")),
  };

  return {
    getNode: () => createMockNode(),
    getNodeParameter: (name: string, _index: number, defaultValue?: unknown) => {
      if (name in ctx.nodeParameters) {
        return ctx.nodeParameters[name];
      }
      return defaultValue;
    },
    helpers: mockHelpers,
  };
}

export function createMockApiRequest(ctx: MockExecuteContext) {
  return async function mockedDocusignApiRequest(
    this: unknown,
    method: string,
    endpoint: string,
    body: object,
    query?: IDataObject
  ) {
    ctx.apiCalls.push({ method, endpoint, body, query });
    return ctx.apiResponse;
  };
}

export const mockEnvelopeResponse = {
  envelopeId: "env-123",
  status: "sent",
  statusDateTime: "2024-01-15T10:30:00Z",
  uri: "/envelopes/env-123",
};

export const mockEnvelopeListResponse = {
  envelopes: [
    {
      envelopeId: "env-123",
      status: "sent",
      emailSubject: "Please sign this document",
      statusDateTime: "2024-01-15T10:30:00Z",
    },
    {
      envelopeId: "env-456",
      status: "completed",
      emailSubject: "Contract for review",
      statusDateTime: "2024-01-14T09:00:00Z",
    },
  ],
  resultSetSize: "2",
  totalSetSize: "2",
};

export const mockTemplateResponse = {
  templateId: "tmpl-123",
  name: "Test Template",
  description: "A test template",
  created: "2024-01-10T08:00:00Z",
};

export const mockTemplateListResponse = {
  envelopeTemplates: [
    {
      templateId: "tmpl-123",
      name: "Test Template",
      description: "A test template",
    },
    {
      templateId: "tmpl-456",
      name: "Another Template",
      description: "Another test template",
    },
  ],
  resultSetSize: "2",
  totalSetSize: "2",
};

export const mockUserResponse = {
  userId: "user-123",
  userName: "Test User",
  email: "test@example.com",
  userStatus: "Active",
};

export const mockUserListResponse = {
  users: [
    {
      userId: "user-123",
      userName: "Test User",
      email: "test@example.com",
      userStatus: "Active",
    },
    {
      userId: "user-456",
      userName: "Another User",
      email: "another@example.com",
      userStatus: "Active",
    },
  ],
  resultSetSize: "2",
  totalSetSize: "2",
};

export const mockGroupResponse = {
  groupId: "group-123",
  groupName: "Test Group",
  groupType: "customGroup",
};

export const mockGroupListResponse = {
  groups: [
    { groupId: "group-123", groupName: "Test Group", groupType: "customGroup" },
    { groupId: "group-456", groupName: "Admin Group", groupType: "adminGroup" },
  ],
};

export const mockFolderResponse = {
  folderId: "folder-123",
  name: "Test Folder",
  type: "normal",
};

export const mockFolderListResponse = {
  folders: [
    { folderId: "folder-123", name: "Test Folder", type: "normal" },
    { folderId: "folder-456", name: "Drafts", type: "draft" },
  ],
};

export const mockAccountResponse = {
  accountId: "account-123",
  accountName: "Test Account",
  baseUri: "https://demo.docusign.net",
};

export const mockBillingResponse = {
  planId: "plan-123",
  planName: "Business Plan",
  billingPeriodStartDate: "2024-01-01",
  billingPeriodEndDate: "2024-12-31",
};

export const mockConnectResponse = {
  connectId: "connect-123",
  configurationType: "custom",
  urlToPublishTo: "https://example.com/webhook",
};

export const mockConnectListResponse = {
  configurations: [
    {
      connectId: "connect-123",
      configurationType: "custom",
      urlToPublishTo: "https://example.com/webhook",
    },
  ],
};

export const mockCustomTabResponse = {
  customTabId: "tab-123",
  tabLabel: "Custom Tab",
  type: "text",
};

export const mockCustomTabListResponse = {
  customTabs: [
    { customTabId: "tab-123", tabLabel: "Custom Tab", type: "text" },
    { customTabId: "tab-456", tabLabel: "Another Tab", type: "checkbox" },
  ],
};

export const mockWorkspaceResponse = {
  workspaceId: "ws-123",
  name: "Test Workspace",
  status: "active",
};

export const mockWorkspaceListResponse = {
  workspaces: [
    { workspaceId: "ws-123", name: "Test Workspace", status: "active" },
    { workspaceId: "ws-456", name: "Archive", status: "active" },
  ],
};

export const mockPowerFormResponse = {
  powerFormId: "pf-123",
  name: "Test PowerForm",
  templateId: "tmpl-123",
};

export const mockPowerFormListResponse = {
  powerForms: [
    { powerFormId: "pf-123", name: "Test PowerForm", templateId: "tmpl-123" },
  ],
};

export const mockSigningGroupResponse = {
  signingGroupId: "sg-123",
  groupName: "Legal Team",
  groupType: "sharedSigningGroup",
};

export const mockSigningGroupListResponse = {
  groups: [
    { signingGroupId: "sg-123", groupName: "Legal Team", groupType: "sharedSigningGroup" },
  ],
};

export const mockPermissionProfileResponse = {
  permissionProfileId: "pp-123",
  permissionProfileName: "Admin Profile",
};

export const mockPermissionProfileListResponse = {
  permissionProfiles: [
    { permissionProfileId: "pp-123", permissionProfileName: "Admin Profile" },
    { permissionProfileId: "pp-456", permissionProfileName: "User Profile" },
  ],
};

export const mockSignatureResponse = {
  signatureId: "sig-123",
  signatureName: "John Signature",
  signatureType: "uploaded",
};

export const mockSignatureListResponse = {
  userSignatures: [
    { signatureId: "sig-123", signatureName: "John Signature", signatureType: "uploaded" },
  ],
};

export const mockBrandsResponse = {
  brands: [
    { brandId: "brand-123", brandName: "Company Brand" },
  ],
};

export const mockDiagnosticsResponse = {
  apiRequestLogging: "true",
  apiRequestLogMaxEntries: "50",
};

export const mockDiagnosticsListResponse = {
  apiRequestLogs: [
    { requestLogId: "log-123", createdDateTime: "2024-01-15T10:00:00Z" },
  ],
};

export const mockNotaryResponse = {
  notaryId: "notary-123",
  name: "Test Notary",
};

export const mockNotaryListResponse = {
  notaries: [
    { notaryId: "notary-123", name: "Test Notary" },
  ],
};

export const mockOrganizationResponse = {
  organizationId: "org-123",
  name: "Test Organization",
};

export const mockCloudStorageResponse = {
  serviceId: "dropbox",
  service: "Dropbox",
};

export const mockCloudStorageListResponse = {
  storageProviders: [
    { serviceId: "dropbox", service: "Dropbox" },
    { serviceId: "googledrive", service: "Google Drive" },
  ],
};

export const mockBulkEnvelopeResponse = {
  batchId: "batch-123",
  batchSize: "10",
  queuedDateTime: "2024-01-15T10:00:00Z",
};

export const mockBulkEnvelopeListResponse = {
  bulkEnvelopeStatuses: [
    { batchId: "batch-123", batchSize: "10", queuedDateTime: "2024-01-15T10:00:00Z" },
  ],
};

export const mockDeleteResponse = {
  success: true,
};
