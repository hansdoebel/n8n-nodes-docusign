import { describe, test, expect, mock, beforeEach } from "bun:test";
import {
  createMockExecuteContext,
  createMockExecuteFunctions,
  createMockApiRequest,
  mockWorkspaceResponse,
  mockWorkspaceListResponse,
  mockDeleteResponse,
  type MockExecuteContext,
} from "../helpers/mockApiRequest";

import * as get from "../../nodes/Docusign/resources/workspaces/operations/get";
import * as list from "../../nodes/Docusign/resources/workspaces/operations/list";
import * as create from "../../nodes/Docusign/resources/workspaces/operations/create";
import * as del from "../../nodes/Docusign/resources/workspaces/operations/delete";
import * as update from "../../nodes/Docusign/resources/workspaces/operations/update";

const mockDocusignApiRequest = mock();

mock.module("@utils", () => ({
  docusignApiRequest: mockDocusignApiRequest,
}));

describe("workspaces API tests", () => {
  let ctx: MockExecuteContext;

  beforeEach(() => {
    mockDocusignApiRequest.mockReset();
  });

  describe("get operation", () => {
    test("calls API with correct endpoint", async () => {
      ctx = createMockExecuteContext(
        {
          workspaceId: "ws-123",
        },
        mockWorkspaceResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/workspaces/ws-123");
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
        mockWorkspaceListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/workspaces");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(2);
    });
  });

  describe("create operation", () => {
    test("calls API with POST method", async () => {
      ctx = createMockExecuteContext(
        {
          workspaceName: "New Workspace",
          additionalFields: {},
        },
        mockWorkspaceResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await create.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("POST");
      expect(ctx.apiCalls[0].endpoint).toBe("/workspaces");
      expect(ctx.apiCalls[0].body).toEqual({
        workspaceName: "New Workspace",
      });
    });
  });

  describe("delete operation", () => {
    test("calls API with DELETE method", async () => {
      ctx = createMockExecuteContext(
        {
          workspaceId: "ws-123",
        },
        mockDeleteResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await del.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("DELETE");
      expect(ctx.apiCalls[0].endpoint).toBe("/workspaces/ws-123");
      expect(ctx.apiCalls[0].body).toEqual({});
    });
  });

  describe("update operation", () => {
    test("calls API with PUT method", async () => {
      ctx = createMockExecuteContext(
        {
          workspaceId: "ws-123",
          additionalFields: {
            workspaceName: "Updated Workspace",
          },
        },
        mockWorkspaceResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("PUT");
      expect(ctx.apiCalls[0].endpoint).toBe("/workspaces/ws-123");
      expect(ctx.apiCalls[0].body).toEqual({
        workspaceName: "Updated Workspace",
      });
    });
  });
});
