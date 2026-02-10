import { describe, test, expect, mock, beforeEach } from "bun:test";
import {
  createMockExecuteContext,
  createMockExecuteFunctions,
  createMockApiRequest,
  mockTemplateResponse,
  mockTemplateListResponse,
  mockDeleteResponse,
  type MockExecuteContext,
} from "../helpers/mockApiRequest";

import * as get from "../../nodes/Docusign/resources/templates/operations/get";
import * as list from "../../nodes/Docusign/resources/templates/operations/list";
import * as del from "../../nodes/Docusign/resources/templates/operations/delete";
import * as update from "../../nodes/Docusign/resources/templates/operations/update";

const mockDocusignApiRequest = mock();

mock.module("@utils", () => ({
  docusignApiRequest: mockDocusignApiRequest,
}));

describe("templates API tests", () => {
  let ctx: MockExecuteContext;

  beforeEach(() => {
    mockDocusignApiRequest.mockReset();
  });

  describe("get operation", () => {
    test("calls API with correct endpoint and empty body", async () => {
      ctx = createMockExecuteContext(
        {
          templateId: "tmpl-123",
          additionalFields: {},
        },
        mockTemplateResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/templates/tmpl-123");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(1);
      expect(result[0].json.templateId).toBe("tmpl-123");
    });

    test("includes query params from additionalFields", async () => {
      ctx = createMockExecuteContext(
        {
          templateId: "tmpl-123",
          additionalFields: {
            include: ["documents", "recipients"],
          },
        },
        mockTemplateResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].query?.include).toBe("documents,recipients");
    });
  });

  describe("list operation", () => {
    test("calls API with correct endpoint and empty body", async () => {
      ctx = createMockExecuteContext(
        {
          returnAll: false,
          limit: 25,
          additionalFields: {},
        },
        mockTemplateListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/templates");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(ctx.apiCalls[0].query?.count).toBe(25);
      expect(result).toHaveLength(2);
    });

    test("applies filter parameters", async () => {
      ctx = createMockExecuteContext(
        {
          returnAll: true,
          additionalFields: {
            search_text: "contract",
            order: "asc",
            order_by: "name",
            folder_types: "templates",
            user_filter: "owned_by_me",
          },
        },
        mockTemplateListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].query?.search_text).toBe("contract");
      expect(ctx.apiCalls[0].query?.order).toBe("asc");
      expect(ctx.apiCalls[0].query?.order_by).toBe("name");
      expect(ctx.apiCalls[0].query?.folder_types).toBe("templates");
      expect(ctx.apiCalls[0].query?.user_filter).toBe("owned_by_me");
    });

    test("returns all templates from envelopeTemplates", async () => {
      ctx = createMockExecuteContext(
        {
          returnAll: true,
          additionalFields: {},
        },
        mockTemplateListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await list.execute.call(mockThis as any, 0);

      expect(result).toHaveLength(2);
      expect(result[0].json.templateId).toBe("tmpl-123");
      expect(result[1].json.templateId).toBe("tmpl-456");
    });
  });

  describe("delete operation", () => {
    test("calls API with DELETE method and empty body", async () => {
      ctx = createMockExecuteContext(
        {
          templateId: "tmpl-123",
        },
        mockDeleteResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await del.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("DELETE");
      expect(ctx.apiCalls[0].endpoint).toBe("/templates/tmpl-123");
      expect(ctx.apiCalls[0].body).toEqual({});
    });
  });

  describe("update operation", () => {
    test("calls API with PUT method and correct body", async () => {
      ctx = createMockExecuteContext(
        {
          templateId: "tmpl-123",
          additionalFields: {
            name: "Updated Template",
            description: "Updated description",
          },
        },
        mockTemplateResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("PUT");
      expect(ctx.apiCalls[0].endpoint).toBe("/templates/tmpl-123");
      expect(ctx.apiCalls[0].body).toEqual({
        name: "Updated Template",
        description: "Updated description",
      });
    });

    test("includes email fields in body", async () => {
      ctx = createMockExecuteContext(
        {
          templateId: "tmpl-123",
          additionalFields: {
            emailSubject: "New Subject",
            emailBlurb: "New message",
          },
        },
        mockTemplateResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].body).toEqual({
        emailSubject: "New Subject",
        emailBlurb: "New message",
      });
    });

    test("includes shared and password fields in body", async () => {
      ctx = createMockExecuteContext(
        {
          templateId: "tmpl-123",
          additionalFields: {
            shared: "true",
            password: "secret123",
          },
        },
        mockTemplateResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].body).toEqual({
        shared: "true",
        password: "secret123",
      });
    });
  });
});
