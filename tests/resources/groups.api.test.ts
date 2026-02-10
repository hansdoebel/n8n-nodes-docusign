import { describe, test, expect, mock, beforeEach } from "bun:test";
import {
  createMockExecuteContext,
  createMockExecuteFunctions,
  createMockApiRequest,
  mockGroupResponse,
  mockGroupListResponse,
  mockDeleteResponse,
  type MockExecuteContext,
} from "../helpers/mockApiRequest";

import * as get from "../../nodes/Docusign/resources/groups/operations/get";
import * as list from "../../nodes/Docusign/resources/groups/operations/list";
import * as create from "../../nodes/Docusign/resources/groups/operations/create";
import * as del from "../../nodes/Docusign/resources/groups/operations/delete";
import * as update from "../../nodes/Docusign/resources/groups/operations/update";

const mockDocusignApiRequest = mock();

mock.module("@utils", () => ({
  docusignApiRequest: mockDocusignApiRequest,
}));

describe("groups API tests", () => {
  let ctx: MockExecuteContext;

  beforeEach(() => {
    mockDocusignApiRequest.mockReset();
  });

  describe("get operation", () => {
    test("calls API with correct endpoint and empty body", async () => {
      ctx = createMockExecuteContext(
        {
          groupId: "group-123",
        },
        mockGroupResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/groups/group-123");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(1);
      expect(result[0].json.groupId).toBe("group-123");
    });
  });

  describe("list operation", () => {
    test("calls API with correct endpoint and empty body", async () => {
      ctx = createMockExecuteContext(
        {
          returnAll: false,
          limit: 50,
          additionalFields: {},
        },
        mockGroupListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/groups");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(2);
    });
  });

  describe("create operation", () => {
    test("calls API with POST method and groups array body", async () => {
      ctx = createMockExecuteContext(
        {
          groupName: "New Group",
          users: {},
          additionalFields: {},
          brands: {},
        },
        { groups: [mockGroupResponse] }
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await create.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("POST");
      expect(ctx.apiCalls[0].endpoint).toBe("/groups");
      expect(ctx.apiCalls[0].body).toEqual({
        groups: [
          {
            groupName: "New Group",
            groupType: "customGroup",
          },
        ],
      });
    });

    test("includes permission profile in body", async () => {
      ctx = createMockExecuteContext(
        {
          groupName: "Admin Group",
          users: {},
          additionalFields: {
            permissionProfileId: "pp-123",
            groupType: "adminGroup",
          },
          brands: {},
        },
        { groups: [mockGroupResponse] }
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await create.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].body).toEqual({
        groups: [
          {
            groupName: "Admin Group",
            groupType: "adminGroup",
            permissionProfileId: "pp-123",
          },
        ],
      });
    });
  });

  describe("delete operation", () => {
    test("calls API with DELETE method and groups array body", async () => {
      ctx = createMockExecuteContext(
        {
          groupId: "group-123",
        },
        { groups: [] }
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await del.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("DELETE");
      expect(ctx.apiCalls[0].endpoint).toBe("/groups");
      expect(ctx.apiCalls[0].body).toEqual({
        groups: [{ groupId: "group-123" }],
      });
    });
  });

  describe("update operation", () => {
    test("calls API with PUT method and groups array body", async () => {
      ctx = createMockExecuteContext(
        {
          groupId: "group-123",
          additionalFields: {
            groupName: "Updated Group",
          },
        },
        { groups: [mockGroupResponse] }
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("PUT");
      expect(ctx.apiCalls[0].endpoint).toBe("/groups");
      expect(ctx.apiCalls[0].body).toEqual({
        groups: [
          {
            groupId: "group-123",
            groupName: "Updated Group",
          },
        ],
      });
    });

    test("includes permission profile in body", async () => {
      ctx = createMockExecuteContext(
        {
          groupId: "group-123",
          additionalFields: {
            groupName: "Updated Group",
            permissionProfileId: "pp-456",
          },
        },
        { groups: [mockGroupResponse] }
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].body).toEqual({
        groups: [
          {
            groupId: "group-123",
            groupName: "Updated Group",
            permissionProfileId: "pp-456",
          },
        ],
      });
    });
  });
});
