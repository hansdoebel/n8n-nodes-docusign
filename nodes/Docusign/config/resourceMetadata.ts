export interface ResourceMetadata {
  key: string;
  displayName: string;
}

export const resourceMetadata: ResourceMetadata[] = [
  { key: "accounts", displayName: "Account" },
  { key: "billing", displayName: "Billing" },
  { key: "bulkEnvelopes", displayName: "Bulk Envelope" },
  { key: "cloudStorage", displayName: "Cloud Storage" },
  { key: "connect", displayName: "Connect" },
  { key: "customTabs", displayName: "Custom Tab" },
  { key: "diagnostics", displayName: "Diagnostic" },
  { key: "envelopes", displayName: "Envelope" },
  { key: "folders", displayName: "Folder" },
  { key: "groups", displayName: "Group" },
  { key: "notary", displayName: "Notary" },
  { key: "organizations", displayName: "Organization" },
  { key: "permissionProfiles", displayName: "Permission Profile" },
  { key: "powerForms", displayName: "PowerForm" },
  { key: "signature", displayName: "Signature" },
  { key: "signingGroups", displayName: "Signing Group" },
  { key: "templates", displayName: "Template" },
  { key: "users", displayName: "User" },
  { key: "workspaces", displayName: "Workspace" },
];
