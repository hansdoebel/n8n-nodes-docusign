import { describe, test, expect, mock, beforeEach } from "bun:test";
import {
  createMockExecuteContext,
  createMockExecuteFunctions,
  createMockApiRequest,
  mockEnvelopeResponse,
  mockEnvelopeListResponse,
  mockDeleteResponse,
  type MockExecuteContext,
} from "../helpers/mockApiRequest";

import * as get from "../../nodes/Docusign/resources/envelopes/operations/get";
import * as list from "../../nodes/Docusign/resources/envelopes/operations/list";
import * as del from "../../nodes/Docusign/resources/envelopes/operations/delete";
import * as update from "../../nodes/Docusign/resources/envelopes/operations/update";

const mockDocusignApiRequest = mock();

mock.module("@utils", () => ({
  docusignApiRequest: mockDocusignApiRequest,
}));

describe("envelopes API tests", () => {
  let ctx: MockExecuteContext;

  beforeEach(() => {
    mockDocusignApiRequest.mockReset();
  });

  describe("get operation", () => {
    test("calls API with correct endpoint", async () => {
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          additionalFields: {},
        },
        mockEnvelopeResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/envelopes/env-123");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(1);
      expect(result[0].json.envelopeId).toBe("env-123");
    });

    test("includes query params from additionalFields", async () => {
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          additionalFields: {
            include: ["documents", "recipients"],
            advanced_update: true,
          },
        },
        mockEnvelopeResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].query?.include).toBe("documents,recipients");
      expect(ctx.apiCalls[0].query?.advanced_update).toBe(true);
    });
  });

  describe("list operation", () => {
    test("calls API with correct endpoint", async () => {
      ctx = createMockExecuteContext(
        {
          returnAll: false,
          limit: 10,
          additionalFields: {},
        },
        mockEnvelopeListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/envelopes");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(ctx.apiCalls[0].query?.count).toBe(10);
      expect(result).toHaveLength(2);
    });

    test("applies filter parameters", async () => {
      ctx = createMockExecuteContext(
        {
          returnAll: true,
          additionalFields: {
            status: ["sent", "completed"],
            from_date: "2024-01-01",
            order: "desc",
            order_by: "created",
          },
        },
        mockEnvelopeListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].query?.status).toBe("sent,completed");
      expect(ctx.apiCalls[0].query?.from_date).toBe("2024-01-01");
      expect(ctx.apiCalls[0].query?.order).toBe("desc");
      expect(ctx.apiCalls[0].query?.order_by).toBe("created");
    });

    test("returns all envelopes from response", async () => {
      ctx = createMockExecuteContext(
        {
          returnAll: true,
          additionalFields: {},
        },
        mockEnvelopeListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await list.execute.call(mockThis as any, 0);

      expect(result).toHaveLength(2);
      expect(result[0].json.envelopeId).toBe("env-123");
      expect(result[1].json.envelopeId).toBe("env-456");
    });
  });

  describe("delete operation", () => {
    test("calls API with DELETE method", async () => {
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
        },
        mockDeleteResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await del.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("DELETE");
      expect(ctx.apiCalls[0].endpoint).toBe("/envelopes/env-123");
      expect(ctx.apiCalls[0].body).toEqual({});
    });
  });

  describe("update operation", () => {
    test("calls API with PUT method and correct body", async () => {
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          additionalFields: {
            status: "voided",
            voidedReason: "Test void",
          },
        },
        mockEnvelopeResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("PUT");
      expect(ctx.apiCalls[0].endpoint).toBe("/envelopes/env-123");
      expect(ctx.apiCalls[0].body).toEqual({
        status: "voided",
        voidedReason: "Test void",
      });
    });

    test("includes email fields in body", async () => {
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          additionalFields: {
            emailSubject: "Updated Subject",
            emailBlurb: "Updated message body",
          },
        },
        mockEnvelopeResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].body).toEqual({
        emailSubject: "Updated Subject",
        emailBlurb: "Updated message body",
      });
    });

    test("includes resend_envelope in query params", async () => {
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          additionalFields: {
            resend_envelope: true,
          },
        },
        mockEnvelopeResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].query?.resend_envelope).toBe(true);
    });
  });
});
