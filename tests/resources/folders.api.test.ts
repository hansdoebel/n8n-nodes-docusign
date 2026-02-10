import { describe, test, expect, mock, beforeEach } from "bun:test";
import {
  createMockExecuteContext,
  createMockExecuteFunctions,
  createMockApiRequest,
  mockFolderResponse,
  mockFolderListResponse,
  type MockExecuteContext,
} from "../helpers/mockApiRequest";

import * as get from "../../nodes/Docusign/resources/folders/operations/get";
import * as getItems from "../../nodes/Docusign/resources/folders/operations/getItems";
import * as list from "../../nodes/Docusign/resources/folders/operations/list";

const mockDocusignApiRequest = mock();

mock.module("@utils", () => ({
  docusignApiRequest: mockDocusignApiRequest,
}));

describe("folders API tests", () => {
  let ctx: MockExecuteContext;

  beforeEach(() => {
    mockDocusignApiRequest.mockReset();
  });

  describe("get operation", () => {
    test("calls API with correct endpoint", async () => {
      ctx = createMockExecuteContext(
        {
          folderId: "folder-123",
          additionalFields: {},
        },
        mockFolderResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/folders/folder-123");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(1);
    });
  });

  describe("getItems operation", () => {
    test("calls API with correct endpoint", async () => {
      const mockItemsResponse = {
        folderItems: [
          { envelopeId: "env-123", subject: "Test" },
        ],
      };

      ctx = createMockExecuteContext(
        {
          folderId: "folder-123",
          returnAll: false,
          limit: 25,
          additionalFields: {},
        },
        mockItemsResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await getItems.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toContain("/folders/folder-123");
      expect(ctx.apiCalls[0].body).toEqual({});
    });
  });

  describe("list operation", () => {
    test("calls API with correct endpoint", async () => {
      ctx = createMockExecuteContext(
        {
          additionalFields: {},
        },
        mockFolderListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/folders");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(2);
    });

    test("applies filter parameters", async () => {
      ctx = createMockExecuteContext(
        {
          additionalFields: {
            include_items: true,
            template: "include",
          },
        },
        mockFolderListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].query?.include_items).toBe(true);
      expect(ctx.apiCalls[0].query?.template).toBe("include");
    });
  });
});
