export interface DSAccount {
  account_id: string;
  account_name: string;
  base_uri: string;
  is_default: boolean;
  organization?: {
    organization_id: string;
    links: Array<{
      rel: string;
      href: string;
    }>;
  };
}

export interface DSMetadataObject {
  accounts: DSAccount[];
  name: string;
  given_name: string;
  family_name: string;
  created: string;
  email: string;
  sub: string;
}

export interface Recipient {
  recipientId?: string;
  email: string;
  name: string;
  routingOrder?: number;
  roleName?: string;
  clientUserId?: string;
  accessCode?: string;
  note?: string;
  tabs?: RecipientTabs;
}

export interface RecipientTabs {
  signHereTabs?: SignHereTab[];
  initialHereTabs?: InitialHereTab[];
  dateSignedTabs?: DateSignedTab[];
  textTabs?: TextTab[];
  checkboxTabs?: CheckboxTab[];
}

export interface SignHereTab {
  documentId?: string;
  pageNumber?: string;
  xPosition?: string;
  yPosition?: string;
  anchorString?: string;
  anchorUnits?: string;
  anchorXOffset?: string;
  anchorYOffset?: string;
}

export interface InitialHereTab {
  documentId?: string;
  pageNumber?: string;
  xPosition?: string;
  yPosition?: string;
  anchorString?: string;
  anchorUnits?: string;
  anchorXOffset?: string;
  anchorYOffset?: string;
}

export interface DateSignedTab {
  documentId?: string;
  pageNumber?: string;
  xPosition?: string;
  yPosition?: string;
  anchorString?: string;
  anchorUnits?: string;
  anchorXOffset?: string;
  anchorYOffset?: string;
}

export interface TextTab {
  documentId?: string;
  pageNumber?: string;
  xPosition?: string;
  yPosition?: string;
  anchorString?: string;
  anchorUnits?: string;
  anchorXOffset?: string;
  anchorYOffset?: string;
  value?: string;
  required?: boolean;
  locked?: boolean;
  tabLabel?: string;
}

export interface CheckboxTab {
  documentId?: string;
  pageNumber?: string;
  xPosition?: string;
  yPosition?: string;
  anchorString?: string;
  anchorUnits?: string;
  anchorXOffset?: string;
  anchorYOffset?: string;
  selected?: boolean;
  required?: boolean;
  locked?: boolean;
  tabLabel?: string;
}

export interface Document {
  documentId?: string;
  documentBase64?: string;
  name: string;
  fileExtension?: string;
  remoteUrl?: string;
  transformPdfFields?: boolean;
}

export interface EnvelopeDefinition {
  emailSubject: string;
  emailBlurb?: string;
  status: string;
  documents?: Document[];
  recipients?: Recipients;
  templateId?: string;
  templateRoles?: TemplateRole[];
}

export interface Recipients {
  signers?: Recipient[];
  carbonCopies?: Recipient[];
  certifiedDeliveries?: Recipient[];
  agents?: Recipient[];
  editors?: Recipient[];
  intermediaries?: Recipient[];
  inPersonSigners?: Recipient[];
}

export interface TemplateRole {
  email: string;
  name: string;
  roleName: string;
  clientUserId?: string;
  tabs?: RecipientTabs;
}

export interface EnvelopeResponse {
  envelopeId: string;
  status: string;
  statusDateTime: string;
  uri: string;
}

export interface TemplateDefinition {
  name: string;
  description?: string;
  shared?: string;
  password?: string;
  folderId?: string;
  folderName?: string;
  documents?: Document[];
  recipients?: Recipients;
  emailSubject?: string;
  emailBlurb?: string;
}

export interface TemplateResponse {
  templateId: string;
  name: string;
  description?: string;
  shared?: string;
  created?: string;
  lastModified?: string;
  uri?: string;
}

export interface User {
  userId?: string;
  userName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  userStatus?: string;
  uri?: string;
  userType?: string;
  isAdmin?: boolean;
}

export interface Group {
  groupId?: string;
  groupName?: string;
  groupType?: string;
  permissionProfileId?: string;
  users?: User[];
}

export interface PermissionProfile {
  permissionProfileId?: string;
  permissionProfileName?: string;
  settings?: PermissionProfileSettings;
}

export interface PermissionProfileSettings {
  useNewDocusignExperienceInterface?: string;
  allowBulkSending?: string;
  allowEnvelopeSending?: string;
  allowSignerAttachments?: string;
  allowTaggingInSendAndCorrect?: string;
  allowWetSigningOverride?: string;
  allowedAddressBookAccess?: string;
  allowedTemplateAccess?: string;
  enableRecipientViewingNotifications?: string;
  enableSequentialSigningInterface?: string;
  receiveCompletedSelfSignedDocumentsAsEmailLinks?: string;
}

export interface Workspace {
  workspaceId?: string;
  workspaceName?: string;
  workspaceDescription?: string;
  created?: string;
  lastModified?: string;
  status?: string;
}

export interface Folder {
  folderId?: string;
  name?: string;
  type?: string;
  uri?: string;
  parentFolderId?: string;
  folders?: Folder[];
  envelopeCount?: number;
}

export interface CustomTab {
  customTabId?: string;
  name?: string;
  type?: string;
  required?: boolean;
  editable?: boolean;
  bold?: boolean;
  font?: string;
  fontSize?: string;
  height?: number;
  width?: number;
}

export interface Brand {
  brandId?: string;
  brandName?: string;
  defaultBrandLanguage?: string;
  brandCompany?: string;
  isOverridingCompanyName?: boolean;
}

export interface PowerForm {
  powerFormId?: string;
  name?: string;
  templateId?: string;
  createdDateTime?: string;
  lastUsed?: string;
  status?: string;
  usesRemaining?: number;
  uri?: string;
}

export interface ListResponse<T> {
  resultSetSize?: number;
  startPosition?: number;
  endPosition?: number;
  nextUri?: string;
  previousUri?: string;
  items?: T[];
}

export interface EnvelopeListResponse extends ListResponse<EnvelopeResponse> {
  envelopes?: EnvelopeResponse[];
  totalSetSize?: number;
}

export interface TemplateListResponse extends ListResponse<TemplateResponse> {
  envelopeTemplates?: TemplateResponse[];
  totalSetSize?: number;
}

export interface UserListResponse extends ListResponse<User> {
  users?: User[];
  totalSetSize?: number;
}
