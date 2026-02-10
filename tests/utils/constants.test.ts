import { describe, test, expect } from "bun:test";
import {
  API_ENDPOINTS,
  EnvelopeStatus,
  TemplateStatus,
  RecipientType,
  DocumentSourceType,
  SigningLocation,
  SharedType,
  SortOrder,
  FolderType,
  ENVELOPE_STATUS_OPTIONS,
  TEMPLATE_STATUS_OPTIONS,
  RECIPIENT_TYPE_OPTIONS,
  DOCUMENT_SOURCE_OPTIONS,
  SIGNING_LOCATION_OPTIONS,
  SHARED_TYPE_OPTIONS,
  SORT_ORDER_OPTIONS,
  FOLDER_TYPE_OPTIONS,
} from "../../nodes/Docusign/utils/constants";

describe("constants", () => {
  describe("API_ENDPOINTS", () => {
    test("has correct ACCOUNTS endpoint", () => {
      expect(API_ENDPOINTS.ACCOUNTS).toBe("");
    });

    test("has correct ENVELOPES endpoint", () => {
      expect(API_ENDPOINTS.ENVELOPES).toBe("/envelopes");
    });

    test("has correct TEMPLATES endpoint", () => {
      expect(API_ENDPOINTS.TEMPLATES).toBe("/templates");
    });

    test("has correct USERS endpoint", () => {
      expect(API_ENDPOINTS.USERS).toBe("/users");
    });

    test("has correct GROUPS endpoint", () => {
      expect(API_ENDPOINTS.GROUPS).toBe("/groups");
    });

    test("has correct FOLDERS endpoint", () => {
      expect(API_ENDPOINTS.FOLDERS).toBe("/folders");
    });

    test("has correct BRANDS endpoint", () => {
      expect(API_ENDPOINTS.BRANDS).toBe("/brands");
    });

    test("has correct BILLING endpoint", () => {
      expect(API_ENDPOINTS.BILLING).toBe("/billing_plan");
    });

    test("has correct BILLING_CHARGES endpoint", () => {
      expect(API_ENDPOINTS.BILLING_CHARGES).toBe("/billing_charges");
    });

    test("has correct BILLING_INVOICES endpoint", () => {
      expect(API_ENDPOINTS.BILLING_INVOICES).toBe("/billing_invoices");
    });

    test("has correct BULK_ENVELOPES endpoint", () => {
      expect(API_ENDPOINTS.BULK_ENVELOPES).toBe("/bulk_envelopes");
    });

    test("has correct CLOUD_STORAGE endpoint", () => {
      expect(API_ENDPOINTS.CLOUD_STORAGE).toBe("/cloud_storage");
    });

    test("has correct CONNECT endpoint", () => {
      expect(API_ENDPOINTS.CONNECT).toBe("/connect");
    });

    test("has correct CUSTOM_TABS endpoint", () => {
      expect(API_ENDPOINTS.CUSTOM_TABS).toBe("/tab_definitions");
    });

    test("has correct POWER_FORMS endpoint", () => {
      expect(API_ENDPOINTS.POWER_FORMS).toBe("/powerforms");
    });

    test("has correct SIGNING_GROUPS endpoint", () => {
      expect(API_ENDPOINTS.SIGNING_GROUPS).toBe("/signing_groups");
    });

    test("has correct WORKSPACES endpoint", () => {
      expect(API_ENDPOINTS.WORKSPACES).toBe("/workspaces");
    });

    test("has correct DIAGNOSTICS endpoint", () => {
      expect(API_ENDPOINTS.DIAGNOSTICS).toBe("/diagnostics/request_logs");
    });

    test("has correct NOTARY endpoint", () => {
      expect(API_ENDPOINTS.NOTARY).toBe("/notary");
    });

    test("has correct ORGANIZATIONS endpoint", () => {
      expect(API_ENDPOINTS.ORGANIZATIONS).toBe("/organizations");
    });

    test("has correct SIGNATURE endpoint", () => {
      expect(API_ENDPOINTS.SIGNATURE).toBe("/signatures");
    });

    test("has correct PERMISSION_PROFILES endpoint", () => {
      expect(API_ENDPOINTS.PERMISSION_PROFILES).toBe("/permission_profiles");
    });
  });

  describe("EnvelopeStatus", () => {
    test("has CREATED status", () => {
      expect(EnvelopeStatus.CREATED).toBe("created");
    });

    test("has SENT status", () => {
      expect(EnvelopeStatus.SENT).toBe("sent");
    });

    test("has DELIVERED status", () => {
      expect(EnvelopeStatus.DELIVERED).toBe("delivered");
    });

    test("has SIGNED status", () => {
      expect(EnvelopeStatus.SIGNED).toBe("signed");
    });

    test("has COMPLETED status", () => {
      expect(EnvelopeStatus.COMPLETED).toBe("completed");
    });

    test("has DECLINED status", () => {
      expect(EnvelopeStatus.DECLINED).toBe("declined");
    });

    test("has VOIDED status", () => {
      expect(EnvelopeStatus.VOIDED).toBe("voided");
    });

    test("has DELETED status", () => {
      expect(EnvelopeStatus.DELETED).toBe("deleted");
    });
  });

  describe("TemplateStatus", () => {
    test("has DRAFT status", () => {
      expect(TemplateStatus.DRAFT).toBe("draft");
    });

    test("has ACTIVE status", () => {
      expect(TemplateStatus.ACTIVE).toBe("active");
    });
  });

  describe("RecipientType", () => {
    test("has SIGNER type", () => {
      expect(RecipientType.SIGNER).toBe("signer");
    });

    test("has CARBON_COPY type", () => {
      expect(RecipientType.CARBON_COPY).toBe("carbonCopy");
    });

    test("has AGENT type", () => {
      expect(RecipientType.AGENT).toBe("agent");
    });

    test("has EDITOR type", () => {
      expect(RecipientType.EDITOR).toBe("editor");
    });

    test("has INTERMEDIARY type", () => {
      expect(RecipientType.INTERMEDIARY).toBe("intermediary");
    });

    test("has CERTIFIED_DELIVERY type", () => {
      expect(RecipientType.CERTIFIED_DELIVERY).toBe("certifiedDelivery");
    });

    test("has IN_PERSON_SIGNER type", () => {
      expect(RecipientType.IN_PERSON_SIGNER).toBe("inPersonSigner");
    });
  });

  describe("DocumentSourceType", () => {
    test("has UPLOAD type", () => {
      expect(DocumentSourceType.UPLOAD).toBe("upload");
    });

    test("has URL type", () => {
      expect(DocumentSourceType.URL).toBe("url");
    });

    test("has TEMPLATE type", () => {
      expect(DocumentSourceType.TEMPLATE).toBe("template");
    });
  });

  describe("SigningLocation", () => {
    test("has INBOX location", () => {
      expect(SigningLocation.INBOX).toBe("inbox");
    });

    test("has ONLINE location", () => {
      expect(SigningLocation.ONLINE).toBe("online");
    });
  });

  describe("SharedType", () => {
    test("has NOT_SHARED type", () => {
      expect(SharedType.NOT_SHARED).toBe("false");
    });

    test("has SHARED type", () => {
      expect(SharedType.SHARED).toBe("true");
    });
  });

  describe("SortOrder", () => {
    test("has ASC order", () => {
      expect(SortOrder.ASC).toBe("asc");
    });

    test("has DESC order", () => {
      expect(SortOrder.DESC).toBe("desc");
    });
  });

  describe("FolderType", () => {
    test("has NORMAL type", () => {
      expect(FolderType.NORMAL).toBe("normal");
    });

    test("has INBOX type", () => {
      expect(FolderType.INBOX).toBe("inbox");
    });

    test("has SENT_ITEMS type", () => {
      expect(FolderType.SENT_ITEMS).toBe("sentitems");
    });

    test("has DRAFT type", () => {
      expect(FolderType.DRAFT).toBe("draft");
    });

    test("has DELETED_ITEMS type", () => {
      expect(FolderType.DELETED_ITEMS).toBe("deletedItems");
    });

    test("has RECYCLEBIN type", () => {
      expect(FolderType.RECYCLEBIN).toBe("recyclebin");
    });

    test("has TEMPLATES type", () => {
      expect(FolderType.TEMPLATES).toBe("templates");
    });

    test("has TEMPLATES_ROOT type", () => {
      expect(FolderType.TEMPLATES_ROOT).toBe("templates_root");
    });
  });

  describe("Option arrays", () => {
    test("ENVELOPE_STATUS_OPTIONS has correct length", () => {
      expect(ENVELOPE_STATUS_OPTIONS).toHaveLength(8);
    });

    test("ENVELOPE_STATUS_OPTIONS contains all statuses", () => {
      const values = ENVELOPE_STATUS_OPTIONS.map((opt) => opt.value);
      expect(values).toContain(EnvelopeStatus.CREATED);
      expect(values).toContain(EnvelopeStatus.SENT);
      expect(values).toContain(EnvelopeStatus.COMPLETED);
    });

    test("TEMPLATE_STATUS_OPTIONS has correct length", () => {
      expect(TEMPLATE_STATUS_OPTIONS).toHaveLength(2);
    });

    test("RECIPIENT_TYPE_OPTIONS has correct length", () => {
      expect(RECIPIENT_TYPE_OPTIONS).toHaveLength(7);
    });

    test("DOCUMENT_SOURCE_OPTIONS has correct length", () => {
      expect(DOCUMENT_SOURCE_OPTIONS).toHaveLength(3);
    });

    test("SIGNING_LOCATION_OPTIONS has correct length", () => {
      expect(SIGNING_LOCATION_OPTIONS).toHaveLength(2);
    });

    test("SHARED_TYPE_OPTIONS has correct length", () => {
      expect(SHARED_TYPE_OPTIONS).toHaveLength(2);
    });

    test("SORT_ORDER_OPTIONS has correct length", () => {
      expect(SORT_ORDER_OPTIONS).toHaveLength(2);
    });

    test("FOLDER_TYPE_OPTIONS has correct length", () => {
      expect(FOLDER_TYPE_OPTIONS).toHaveLength(8);
    });

    test("option arrays have name and value properties", () => {
      for (const opt of ENVELOPE_STATUS_OPTIONS) {
        expect(opt).toHaveProperty("name");
        expect(opt).toHaveProperty("value");
        expect(typeof opt.name).toBe("string");
        expect(typeof opt.value).toBe("string");
      }
    });
  });
});
