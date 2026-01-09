export const API_ENDPOINTS = {
  ACCOUNTS: "",
  BRANDS: "/brands",
  ENVELOPES: "/envelopes",
  FOLDERS: "/folders",
  GROUPS: "/groups",
  TEMPLATES: "/templates",
  USERS: "/users",
  BILLING: "/billing_plan",
  BILLING_CHARGES: "/billing_charges",
  BILLING_INVOICES: "/billing_invoices",
  BILLING_PAYMENTS: "/billing_payments",
  BULK_ENVELOPES: "/bulk_envelopes",
  CLOUD_STORAGE: "/cloud_storage",
  CONNECT: "/connect",
  CUSTOM_TABS: "/tab_definitions",
  POWER_FORMS: "/powerforms",
  SIGNING_GROUPS: "/signing_groups",
  WORKSPACES: "/workspaces",
  AUTHENTICATION: "/oauth2/token",
  DIAGNOSTICS: "/diagnostics/request_logs",
  EMAIL_ARCHIVE: "/email_archive",
  NOTARY: "/notary",
  ORGANIZATIONS: "/organizations",
  SIGNATURE: "/signatures",
  PERMISSION_PROFILES: "/permission_profiles",
};

export enum EnvelopeStatus {
  CREATED = "created",
  SENT = "sent",
  DELIVERED = "delivered",
  SIGNED = "signed",
  COMPLETED = "completed",
  DECLINED = "declined",
  VOIDED = "voided",
  DELETED = "deleted",
}

export enum TemplateStatus {
  DRAFT = "draft",
  ACTIVE = "active",
}

export enum RecipientType {
  SIGNER = "signer",
  CARBON_COPY = "carbonCopy",
  AGENT = "agent",
  EDITOR = "editor",
  INTERMEDIARY = "intermediary",
  CERTIFIED_DELIVERY = "certifiedDelivery",
  IN_PERSON_SIGNER = "inPersonSigner",
}

export enum DocumentSourceType {
  UPLOAD = "upload",
  URL = "url",
  TEMPLATE = "template",
}

export enum SigningLocation {
  INBOX = "inbox",
  ONLINE = "online",
}

export enum SharedType {
  NOT_SHARED = "false",
  SHARED = "true",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum FolderType {
  NORMAL = "normal",
  INBOX = "inbox",
  SENT_ITEMS = "sentitems",
  DRAFT = "draft",
  DELETED_ITEMS = "deletedItems",
  RECYCLEBIN = "recyclebin",
  TEMPLATES = "templates",
  TEMPLATES_ROOT = "templates_root",
}

export const ENVELOPE_STATUS_OPTIONS = [
  { name: "Created", value: EnvelopeStatus.CREATED },
  { name: "Sent", value: EnvelopeStatus.SENT },
  { name: "Delivered", value: EnvelopeStatus.DELIVERED },
  { name: "Signed", value: EnvelopeStatus.SIGNED },
  { name: "Completed", value: EnvelopeStatus.COMPLETED },
  { name: "Declined", value: EnvelopeStatus.DECLINED },
  { name: "Voided", value: EnvelopeStatus.VOIDED },
  { name: "Deleted", value: EnvelopeStatus.DELETED },
];

export const TEMPLATE_STATUS_OPTIONS = [
  { name: "Draft", value: TemplateStatus.DRAFT },
  { name: "Active", value: TemplateStatus.ACTIVE },
];

export const RECIPIENT_TYPE_OPTIONS = [
  { name: "Signer", value: RecipientType.SIGNER },
  { name: "Carbon Copy", value: RecipientType.CARBON_COPY },
  { name: "Agent", value: RecipientType.AGENT },
  { name: "Editor", value: RecipientType.EDITOR },
  { name: "Intermediary", value: RecipientType.INTERMEDIARY },
  { name: "Certified Delivery", value: RecipientType.CERTIFIED_DELIVERY },
  { name: "In Person Signer", value: RecipientType.IN_PERSON_SIGNER },
];

export const DOCUMENT_SOURCE_OPTIONS = [
  { name: "Upload File", value: DocumentSourceType.UPLOAD },
  { name: "URL", value: DocumentSourceType.URL },
  { name: "Template", value: DocumentSourceType.TEMPLATE },
];

export const SIGNING_LOCATION_OPTIONS = [
  { name: "Inbox", value: SigningLocation.INBOX },
  { name: "Online", value: SigningLocation.ONLINE },
];

export const SHARED_TYPE_OPTIONS = [
  { name: "Not Shared", value: SharedType.NOT_SHARED },
  { name: "Shared", value: SharedType.SHARED },
];

export const SORT_ORDER_OPTIONS = [
  { name: "Ascending", value: SortOrder.ASC },
  { name: "Descending", value: SortOrder.DESC },
];

export const FOLDER_TYPE_OPTIONS = [
  { name: "Normal", value: FolderType.NORMAL },
  { name: "Inbox", value: FolderType.INBOX },
  { name: "Sent Items", value: FolderType.SENT_ITEMS },
  { name: "Draft", value: FolderType.DRAFT },
  { name: "Deleted Items", value: FolderType.DELETED_ITEMS },
  { name: "Recycle Bin", value: FolderType.RECYCLEBIN },
  { name: "Templates", value: FolderType.TEMPLATES },
  { name: "Templates Root", value: FolderType.TEMPLATES_ROOT },
];
