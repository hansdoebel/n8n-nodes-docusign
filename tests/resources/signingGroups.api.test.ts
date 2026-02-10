import { describe, test, expect, mock, beforeEach } from "bun:test";
import {
  createMockExecuteContext,
  createMockExecuteFunctions,
  createMockApiRequest,
  mockSigningGroupResponse,
  mockSigningGroupListResponse,
  mockDeleteResponse,
  type MockExecuteContext,
} from "../helpers/mockApiRequest";

import * as get from "../../nodes/Docusign/resources/signingGroups/operations/get";
import * as list from "../../nodes/Docusign/resources/signingGroups/operations/list";
import * as create from "../../nodes/Docusign/resources/signingGroups/operations/create";
import * as del from "../../nodes/Docusign/resources/signingGroups/operations/delete";
import * as update from "../../nodes/Docusign/resources/signingGroups/operations/update";

const mockDocusignApiRequest = mock();

mock.module("@utils", () => ({
  docusignApiRequest: mockDocusignApiRequest,
}));

describe("signingGroups API tests", () => {
  let ctx: MockExecuteContext;

  beforeEach(() => {
    mockDocusignApiRequest.mockReset();
  });

  describe("get operation", () => {
    test("calls API with correct endpoint", async () => {
      ctx = createMockExecuteContext(
        {
          signingGroupId: "sg-123",
        },
        mockSigningGroupResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/signing_groups/sg-123");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(1);
    });
  });

  describe("list operation", () => {
    test("calls API with correct endpoint", async () => {
      ctx = createMockExecuteContext(
        {
          additionalFields: {},
        },
        mockSigningGroupListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/signing_groups");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(1);
    });
  });

  describe("create operation", () => {
    test("calls API with POST method", async () => {
      ctx = createMockExecuteContext(
        {
          groupName: "Legal Team",
          additionalFields: {},
        },
        mockSigningGroupResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await create.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("POST");
      expect(ctx.apiCalls[0].endpoint).toBe("/signing_groups");
      expect(ctx.apiCalls[0].body).toEqual({
        groups: [{ groupName: "Legal Team" }],
      });
    });
  });

  describe("delete operation", () => {
    test("calls API with DELETE method", async () => {
      ctx = createMockExecuteContext(
        {
          signingGroupId: "sg-123",
        },
        mockDeleteResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await del.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("DELETE");
      expect(ctx.apiCalls[0].endpoint).toBe("/signing_groups");
      expect(ctx.apiCalls[0].body).toEqual({
        groups: [{ groupId: "sg-123" }],
      });
    });
  });

  describe("update operation", () => {
    test("calls API with PUT method", async () => {
      ctx = createMockExecuteContext(
        {
          signingGroupId: "sg-123",
          additionalFields: {
            groupName: "Updated Team",
          },
        },
        mockSigningGroupResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("PUT");
      expect(ctx.apiCalls[0].endpoint).toBe("/signing_groups");
      expect(ctx.apiCalls[0].body).toEqual({
        groups: [{ groupId: "sg-123", groupName: "Updated Team" }],
      });
    });
  });
});
