import { describe, test, expect } from "bun:test";
import {
  buildEnvelopeEndpoint,
  buildTemplateEndpoint,
  buildUserEndpoint,
  buildGroupEndpoint,
  buildFolderEndpoint,
  buildWorkspaceEndpoint,
  buildPowerFormEndpoint,
  buildPermissionProfileEndpoint,
  buildSigningGroupEndpoint,
  buildCloudStorageEndpoint,
  buildCustomTabEndpoint,
  buildConnectEndpoint,
  buildResourceEndpoint,
} from "../../nodes/Docusign/utils/endpoints";

describe("endpoints", () => {
  describe("buildEnvelopeEndpoint", () => {
    test("returns base endpoint when no parameters", () => {
      expect(buildEnvelopeEndpoint()).toBe("/envelopes");
    });

    test("returns endpoint with envelopeId", () => {
      expect(buildEnvelopeEndpoint("123")).toBe("/envelopes/123");
    });

    test("returns endpoint with envelopeId and subPath", () => {
      expect(buildEnvelopeEndpoint("123", "documents")).toBe("/envelopes/123/documents");
    });

    test("ignores subPath when no envelopeId", () => {
      expect(buildEnvelopeEndpoint(undefined, "documents")).toBe("/envelopes");
    });
  });

  describe("buildTemplateEndpoint", () => {
    test("returns base endpoint when no parameters", () => {
      expect(buildTemplateEndpoint()).toBe("/templates");
    });

    test("returns endpoint with templateId", () => {
      expect(buildTemplateEndpoint("456")).toBe("/templates/456");
    });

    test("returns endpoint with templateId and subPath", () => {
      expect(buildTemplateEndpoint("456", "recipients")).toBe("/templates/456/recipients");
    });
  });

  describe("buildUserEndpoint", () => {
    test("returns base endpoint when no parameters", () => {
      expect(buildUserEndpoint()).toBe("/users");
    });

    test("returns endpoint with userId", () => {
      expect(buildUserEndpoint("user-123")).toBe("/users/user-123");
    });

    test("returns endpoint with userId and subPath", () => {
      expect(buildUserEndpoint("user-123", "profile")).toBe("/users/user-123/profile");
    });
  });

  describe("buildGroupEndpoint", () => {
    test("returns base endpoint when no parameters", () => {
      expect(buildGroupEndpoint()).toBe("/groups");
    });

    test("returns endpoint with groupId", () => {
      expect(buildGroupEndpoint("group-1")).toBe("/groups/group-1");
    });

    test("returns endpoint with groupId and subPath", () => {
      expect(buildGroupEndpoint("group-1", "users")).toBe("/groups/group-1/users");
    });
  });

  describe("buildFolderEndpoint", () => {
    test("returns base endpoint when no parameters", () => {
      expect(buildFolderEndpoint()).toBe("/folders");
    });

    test("returns endpoint with folderId", () => {
      expect(buildFolderEndpoint("folder-abc")).toBe("/folders/folder-abc");
    });

    test("returns endpoint with folderId and subPath", () => {
      expect(buildFolderEndpoint("folder-abc", "items")).toBe("/folders/folder-abc/items");
    });
  });

  describe("buildWorkspaceEndpoint", () => {
    test("returns base endpoint when no parameters", () => {
      expect(buildWorkspaceEndpoint()).toBe("/workspaces");
    });

    test("returns endpoint with workspaceId", () => {
      expect(buildWorkspaceEndpoint("ws-1")).toBe("/workspaces/ws-1");
    });

    test("returns endpoint with workspaceId and subPath", () => {
      expect(buildWorkspaceEndpoint("ws-1", "folders")).toBe("/workspaces/ws-1/folders");
    });
  });

  describe("buildPowerFormEndpoint", () => {
    test("returns base endpoint when no parameters", () => {
      expect(buildPowerFormEndpoint()).toBe("/powerforms");
    });

    test("returns endpoint with powerFormId", () => {
      expect(buildPowerFormEndpoint("pf-123")).toBe("/powerforms/pf-123");
    });

    test("returns endpoint with powerFormId and subPath", () => {
      expect(buildPowerFormEndpoint("pf-123", "data")).toBe("/powerforms/pf-123/data");
    });
  });

  describe("buildPermissionProfileEndpoint", () => {
    test("returns base endpoint when no parameters", () => {
      expect(buildPermissionProfileEndpoint()).toBe("/permission_profiles");
    });

    test("returns endpoint with permissionProfileId", () => {
      expect(buildPermissionProfileEndpoint("pp-1")).toBe("/permission_profiles/pp-1");
    });

    test("returns endpoint with permissionProfileId and subPath", () => {
      expect(buildPermissionProfileEndpoint("pp-1", "settings")).toBe("/permission_profiles/pp-1/settings");
    });
  });

  describe("buildSigningGroupEndpoint", () => {
    test("returns base endpoint when no parameters", () => {
      expect(buildSigningGroupEndpoint()).toBe("/signing_groups");
    });

    test("returns endpoint with signingGroupId", () => {
      expect(buildSigningGroupEndpoint("sg-1")).toBe("/signing_groups/sg-1");
    });

    test("returns endpoint with signingGroupId and subPath", () => {
      expect(buildSigningGroupEndpoint("sg-1", "users")).toBe("/signing_groups/sg-1/users");
    });
  });

  describe("buildCloudStorageEndpoint", () => {
    test("returns base endpoint when no parameters", () => {
      expect(buildCloudStorageEndpoint()).toBe("/cloud_storage");
    });

    test("returns endpoint with cloudStorageId", () => {
      expect(buildCloudStorageEndpoint("cs-1")).toBe("/cloud_storage/cs-1");
    });

    test("returns endpoint with cloudStorageId and subPath", () => {
      expect(buildCloudStorageEndpoint("cs-1", "folders")).toBe("/cloud_storage/cs-1/folders");
    });
  });

  describe("buildCustomTabEndpoint", () => {
    test("returns base endpoint when no parameters", () => {
      expect(buildCustomTabEndpoint()).toBe("/tab_definitions");
    });

    test("returns endpoint with customTabId", () => {
      expect(buildCustomTabEndpoint("ct-1")).toBe("/tab_definitions/ct-1");
    });
  });

  describe("buildConnectEndpoint", () => {
    test("returns base endpoint when no parameters", () => {
      expect(buildConnectEndpoint()).toBe("/connect");
    });

    test("returns endpoint with connectId", () => {
      expect(buildConnectEndpoint("conn-1")).toBe("/connect/conn-1");
    });
  });

  describe("buildResourceEndpoint", () => {
    test("returns base endpoint when no resourceId", () => {
      expect(buildResourceEndpoint("/custom")).toBe("/custom");
    });

    test("returns endpoint with resourceId", () => {
      expect(buildResourceEndpoint("/custom", "res-1")).toBe("/custom/res-1");
    });

    test("returns endpoint with resourceId and subPath", () => {
      expect(buildResourceEndpoint("/custom", "res-1", "sub")).toBe("/custom/res-1/sub");
    });

    test("ignores subPath when no resourceId", () => {
      expect(buildResourceEndpoint("/custom", undefined, "sub")).toBe("/custom");
    });
  });
});
