import { describe, test, expect, mock, beforeEach } from "bun:test";
import {
  createMockExecuteContext,
  createMockExecuteFunctions,
  createMockApiRequest,
  mockSignatureResponse,
  mockSignatureListResponse,
  mockDeleteResponse,
  type MockExecuteContext,
} from "../helpers/mockApiRequest";

import * as get from "../../nodes/Docusign/resources/signature/operations/get";
import * as list from "../../nodes/Docusign/resources/signature/operations/list";
import * as create from "../../nodes/Docusign/resources/signature/operations/create";
import * as del from "../../nodes/Docusign/resources/signature/operations/delete";
import * as update from "../../nodes/Docusign/resources/signature/operations/update";

const mockDocusignApiRequest = mock();

mock.module("@utils", () => ({
  docusignApiRequest: mockDocusignApiRequest,
}));

describe("signature API tests", () => {
  let ctx: MockExecuteContext;

  beforeEach(() => {
    mockDocusignApiRequest.mockReset();
  });

  describe("get operation", () => {
    test("calls API with correct endpoint", async () => {
      ctx = createMockExecuteContext(
        {
          signatureId: "sig-123",
        },
        mockSignatureResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/signatures/sig-123");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(1);
    });
  });

  describe("list operation", () => {
    test("calls API with correct endpoint", async () => {
      const mockListResponse = {
        accountSignatures: [
          { signatureId: "sig-123", signatureName: "John Signature" },
        ],
      };

      ctx = createMockExecuteContext(
        {},
        mockListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/signatures");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(1);
    });
  });

  describe("create operation", () => {
    test("calls API with POST method", async () => {
      ctx = createMockExecuteContext(
        {
          signatureName: "New Signature",
          additionalFields: {},
        },
        mockSignatureResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await create.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("POST");
      expect(ctx.apiCalls[0].endpoint).toBe("/signatures");
      expect(ctx.apiCalls[0].body).toEqual({
        signatureName: "New Signature",
      });
    });
  });

  describe("delete operation", () => {
    test("calls API with DELETE method", async () => {
      ctx = createMockExecuteContext(
        {
          signatureId: "sig-123",
        },
        mockDeleteResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await del.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("DELETE");
      expect(ctx.apiCalls[0].endpoint).toBe("/signatures/sig-123");
      expect(ctx.apiCalls[0].body).toEqual({});
    });
  });

  describe("update operation", () => {
    test("calls API with PUT method", async () => {
      ctx = createMockExecuteContext(
        {
          signatureId: "sig-123",
          additionalFields: {
            signatureName: "Updated Signature",
          },
        },
        mockSignatureResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("PUT");
      expect(ctx.apiCalls[0].endpoint).toBe("/signatures/sig-123");
      expect(ctx.apiCalls[0].body).toEqual({
        signatureName: "Updated Signature",
      });
    });
  });
});
