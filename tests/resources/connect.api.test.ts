import { describe, test, expect, mock, beforeEach } from "bun:test";
import {
  createMockExecuteContext,
  createMockExecuteFunctions,
  createMockApiRequest,
  mockConnectResponse,
  mockConnectListResponse,
  mockDeleteResponse,
  type MockExecuteContext,
} from "../helpers/mockApiRequest";

import * as get from "../../nodes/Docusign/resources/connect/operations/get";
import * as list from "../../nodes/Docusign/resources/connect/operations/list";
import * as create from "../../nodes/Docusign/resources/connect/operations/create";
import * as del from "../../nodes/Docusign/resources/connect/operations/delete";
import * as update from "../../nodes/Docusign/resources/connect/operations/update";

const mockDocusignApiRequest = mock();

mock.module("@utils", () => ({
  docusignApiRequest: mockDocusignApiRequest,
}));

describe("connect API tests", () => {
  let ctx: MockExecuteContext;

  beforeEach(() => {
    mockDocusignApiRequest.mockReset();
  });

  describe("get operation", () => {
    test("calls API with correct endpoint and empty body", async () => {
      ctx = createMockExecuteContext(
        {
          connectId: "connect-123",
        },
        mockConnectResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/connect/connect-123");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(1);
    });
  });

  describe("list operation", () => {
    test("calls API with correct endpoint and empty body", async () => {
      ctx = createMockExecuteContext(
        {
          additionalFields: {},
        },
        mockConnectListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/connect");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(1);
    });
  });

  describe("create operation", () => {
    test("calls API with POST method and correct body", async () => {
      ctx = createMockExecuteContext(
        {
          name: "Test Webhook",
          urlToPublishTo: "https://example.com/webhook",
          envelopeEvents: {},
          recipientEvents: {},
          additionalFields: {},
        },
        mockConnectResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await create.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("POST");
      expect(ctx.apiCalls[0].endpoint).toBe("/connect");
      expect(ctx.apiCalls[0].body).toEqual({
        urlToPublishTo: "https://example.com/webhook",
        name: "Test Webhook",
      });
    });

    test("includes envelope events in body", async () => {
      ctx = createMockExecuteContext(
        {
          name: "Test Webhook",
          urlToPublishTo: "https://example.com/webhook",
          envelopeEvents: {
            events: [
              { envelopeEventStatusCode: "Sent", includeDocuments: false },
              { envelopeEventStatusCode: "Completed", includeDocuments: true },
            ],
          },
          recipientEvents: {},
          additionalFields: {},
        },
        mockConnectResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await create.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].body).toEqual({
        urlToPublishTo: "https://example.com/webhook",
        name: "Test Webhook",
        envelopeEvents: [
          { envelopeEventStatusCode: "Sent", includeDocuments: "false" },
          { envelopeEventStatusCode: "Completed", includeDocuments: "true" },
        ],
      });
    });

    test("includes recipient events in body", async () => {
      ctx = createMockExecuteContext(
        {
          name: "Test Webhook",
          urlToPublishTo: "https://example.com/webhook",
          envelopeEvents: {},
          recipientEvents: {
            events: [
              { recipientEventStatusCode: "Delivered", includeDocuments: false },
            ],
          },
          additionalFields: {},
        },
        mockConnectResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await create.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].body).toEqual({
        urlToPublishTo: "https://example.com/webhook",
        name: "Test Webhook",
        recipientEvents: [
          { recipientEventStatusCode: "Delivered", includeDocuments: "false" },
        ],
      });
    });

    test("includes additional fields in body", async () => {
      ctx = createMockExecuteContext(
        {
          name: "Test Webhook",
          urlToPublishTo: "https://example.com/webhook",
          envelopeEvents: {},
          recipientEvents: {},
          additionalFields: {
            allUsers: true,
            enableLog: true,
            includeDocuments: true,
          },
        },
        mockConnectResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await create.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].body).toEqual({
        urlToPublishTo: "https://example.com/webhook",
        name: "Test Webhook",
        allUsers: "true",
        enableLog: "true",
        includeDocuments: "true",
      });
    });
  });

  describe("delete operation", () => {
    test("calls API with DELETE method and empty body", async () => {
      ctx = createMockExecuteContext(
        {
          connectId: "connect-123",
        },
        mockDeleteResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await del.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("DELETE");
      expect(ctx.apiCalls[0].endpoint).toBe("/connect/connect-123");
      expect(ctx.apiCalls[0].body).toEqual({});
    });
  });

  describe("update operation", () => {
    test("calls API with PUT method and correct body", async () => {
      ctx = createMockExecuteContext(
        {
          connectId: "connect-123",
          additionalFields: {
            urlToPublishTo: "https://example.com/new-webhook",
          },
        },
        mockConnectResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("PUT");
      expect(ctx.apiCalls[0].endpoint).toBe("/connect/connect-123");
      expect(ctx.apiCalls[0].body).toEqual({
        urlToPublishTo: "https://example.com/new-webhook",
      });
    });

    test("includes all update fields in body", async () => {
      ctx = createMockExecuteContext(
        {
          connectId: "connect-123",
          additionalFields: {
            name: "Updated Webhook",
            urlToPublishTo: "https://example.com/updated",
            allowEnvelopePublish: true,
            enableLog: true,
            includeCertificateOfCompletion: true,
            includeDocuments: false,
          },
        },
        mockConnectResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].body).toEqual({
        name: "Updated Webhook",
        urlToPublishTo: "https://example.com/updated",
        allowEnvelopePublish: true,
        enableLog: true,
        includeCertificateOfCompletion: true,
        includeDocuments: false,
      });
    });
  });
});
