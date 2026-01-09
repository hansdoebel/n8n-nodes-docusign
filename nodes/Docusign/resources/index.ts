export { accounts, operations as accountsOps } from "./accounts";
export { billing, operations as billingOps } from "./billing";
export { bulkEnvelopes, operations as bulkEnvelopesOps } from "./bulkEnvelopes";
export { cloudStorage, operations as cloudStorageOps } from "./cloudStorage";
export { connect, operations as connectOps } from "./connect";
export { customTabs, operations as customTabsOps } from "./customTabs";
export { diagnostics, operations as diagnosticsOps } from "./diagnostics";
export { envelopes, operations as envelopesOps } from "./envelopes";
export { folders, operations as foldersOps } from "./folders";
export { groups, operations as groupsOps } from "./groups";
export { notary, operations as notaryOps } from "./notary";
export { operations as organizationsOps, organizations } from "./organizations";
export {
  operations as permissionProfilesOps,
  permissionProfiles,
} from "./permissionProfiles";
export { operations as powerFormsOps, powerForms } from "./powerForms";
export { operations as signatureOps, signature } from "./signature";
export { operations as signingGroupsOps, signingGroups } from "./signingGroups";
export { operations as templatesOps, templates } from "./templates";
export { operations as usersOps, users } from "./users";
export { operations as workspacesOps, workspaces } from "./workspaces";

import * as accountsModule from "./accounts";
import * as billingModule from "./billing";
import * as bulkEnvelopesModule from "./bulkEnvelopes";
import * as cloudStorageModule from "./cloudStorage";
import * as connectModule from "./connect";
import * as customTabsModule from "./customTabs";
import * as diagnosticsModule from "./diagnostics";
import * as envelopesModule from "./envelopes";
import * as foldersModule from "./folders";
import * as groupsModule from "./groups";
import * as notaryModule from "./notary";
import * as organizationsModule from "./organizations";
import * as permissionProfilesModule from "./permissionProfiles";
import * as powerFormsModule from "./powerForms";
import * as signatureModule from "./signature";
import * as signingGroupsModule from "./signingGroups";
import * as templatesModule from "./templates";
import * as usersModule from "./users";
import * as workspacesModule from "./workspaces";

export const allResources = {
  accounts: accountsModule.accounts,
  billing: billingModule.billing,
  bulkEnvelopes: bulkEnvelopesModule.bulkEnvelopes,
  cloudStorage: cloudStorageModule.cloudStorage,
  connect: connectModule.connect,
  customTabs: customTabsModule.customTabs,
  diagnostics: diagnosticsModule.diagnostics,
  envelopes: envelopesModule.envelopes,
  folders: foldersModule.folders,
  groups: groupsModule.groups,
  notary: notaryModule.notary,
  organizations: organizationsModule.organizations,
  permissionProfiles: permissionProfilesModule.permissionProfiles,
  powerForms: powerFormsModule.powerForms,
  signature: signatureModule.signature,
  signingGroups: signingGroupsModule.signingGroups,
  templates: templatesModule.templates,
  users: usersModule.users,
  workspaces: workspacesModule.workspaces,
};

export const allOperations = [
  accountsModule.operations,
  billingModule.operations,
  bulkEnvelopesModule.operations,
  cloudStorageModule.operations,
  connectModule.operations,
  customTabsModule.operations,
  diagnosticsModule.operations,
  envelopesModule.operations,
  foldersModule.operations,
  groupsModule.operations,
  notaryModule.operations,
  organizationsModule.operations,
  permissionProfilesModule.operations,
  powerFormsModule.operations,
  signatureModule.operations,
  signingGroupsModule.operations,
  templatesModule.operations,
  usersModule.operations,
  workspacesModule.operations,
];
