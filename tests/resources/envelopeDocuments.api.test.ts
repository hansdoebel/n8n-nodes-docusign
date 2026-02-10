import { describe, test, expect, mock, beforeEach } from "bun:test";
import {
  createMockExecuteContext,
  createMockExecuteFunctions,
  createMockApiRequest,
  mockDeleteResponse,
  type MockExecuteContext,
} from "../helpers/mockApiRequest";

import * as get from "../../nodes/Docusign/resources/envelopeDocuments/operations/get";
import * as list from "../../nodes/Docusign/resources/envelopeDocuments/operations/list";
import * as del from "../../nodes/Docusign/resources/envelopeDocuments/operations/delete";
import * as update from "../../nodes/Docusign/resources/envelopeDocuments/operations/update";
import * as updateList from "../../nodes/Docusign/resources/envelopeDocuments/operations/updateList";

const mockDocusignApiRequest = mock();

mock.module("@utils", () => ({
  docusignApiRequest: mockDocusignApiRequest,
}));

const mockDocumentListResponse = {
  envelopeDocuments: [
    {
      documentId: "1",
      name: "Contract.pdf",
      type: "content",
      uri: "/envelopes/env-123/documents/1",
    },
    {
      documentId: "2",
      name: "Appendix.pdf",
      type: "content",
      uri: "/envelopes/env-123/documents/2",
    },
  ],
  envelopeId: "env-123",
};

const mockUpdateResponse = {
  envelopeId: "env-123",
  envelopeDocuments: [
    { documentId: "1", name: "Updated.pdf" },
  ],
};

describe("envelopeDocuments API tests", () => {
  let ctx: MockExecuteContext;

  beforeEach(() => {
    mockDocusignApiRequest.mockReset();
  });

  describe("get operation", () => {
    test("calls API with correct endpoint for combined documents", async () => {
      const pdfBuffer = Buffer.from("mock-pdf-content");
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          documentId: "combined",
          additionalFields: {},
        },
        pdfBuffer,
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      (mockThis as any).helpers.prepareBinaryData = mock(async (buffer: Buffer, fileName: string, mimeType: string) => ({
        data: buffer.toString("base64"),
        fileName,
        mimeType,
      }));

      const result = await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/envelopes/env-123/documents/combined");
      expect(result).toHaveLength(1);
      expect(result[0].json.envelopeId).toBe("env-123");
      expect(result[0].json.documentId).toBe("combined");
      expect(result[0].json.mimeType).toBe("application/pdf");
      expect(result[0].binary).toBeDefined();
    });

    test("calls API with correct endpoint for specific document", async () => {
      const pdfBuffer = Buffer.from("mock-pdf-content");
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          documentId: "specific",
          specificDocumentId: "3",
          additionalFields: {},
        },
        pdfBuffer,
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      (mockThis as any).helpers.prepareBinaryData = mock(async (buffer: Buffer, fileName: string, mimeType: string) => ({
        data: buffer.toString("base64"),
        fileName,
        mimeType,
      }));

      const result = await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].endpoint).toBe("/envelopes/env-123/documents/3");
      expect(result[0].json.documentId).toBe("3");
      expect(result[0].json.fileName).toBe("env-123_3.pdf");
    });

    test("returns zip mime type for archive documents", async () => {
      const zipBuffer = Buffer.from("mock-zip-content");
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          documentId: "archive",
          additionalFields: {},
        },
        zipBuffer,
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      (mockThis as any).helpers.prepareBinaryData = mock(async (buffer: Buffer, fileName: string, mimeType: string) => ({
        data: buffer.toString("base64"),
        fileName,
        mimeType,
      }));

      const result = await get.execute.call(mockThis as any, 0);

      expect(result[0].json.mimeType).toBe("application/zip");
      expect(result[0].json.fileName).toBe("env-123_archive.zip");
    });

    test("includes query params from additionalFields", async () => {
      const pdfBuffer = Buffer.from("mock-pdf-content");
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          documentId: "combined",
          additionalFields: {
            certificate: true,
            show_changes: true,
            watermark: false,
            language: "de",
          },
        },
        pdfBuffer,
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      (mockThis as any).helpers.prepareBinaryData = mock(async (buffer: Buffer, fileName: string, mimeType: string) => ({
        data: buffer.toString("base64"),
        fileName,
        mimeType,
      }));

      await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].query?.certificate).toBe(true);
      expect(ctx.apiCalls[0].query?.show_changes).toBe(true);
      expect(ctx.apiCalls[0].query?.watermark).toBe(false);
      expect(ctx.apiCalls[0].query?.language).toBe("de");
    });
  });

  describe("list operation", () => {
    test("calls API with correct endpoint", async () => {
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          additionalFields: {},
        },
        mockDocumentListResponse,
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/envelopes/env-123/documents");
      expect(result).toHaveLength(2);
      expect(result[0].json.documentId).toBe("1");
      expect(result[1].json.documentId).toBe("2");
    });

    test("includes include_document_size query param", async () => {
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          additionalFields: {
            include_document_size: true,
          },
        },
        mockDocumentListResponse,
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].query?.include_document_size).toBe(true);
    });
  });

  describe("delete operation", () => {
    test("calls API with DELETE method and document IDs in body", async () => {
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          documentIds: "1,2,3",
        },
        mockDeleteResponse,
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await del.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("DELETE");
      expect(ctx.apiCalls[0].endpoint).toBe("/envelopes/env-123/documents");
      expect(ctx.apiCalls[0].body).toEqual({
        documents: [
          { documentId: "1" },
          { documentId: "2" },
          { documentId: "3" },
        ],
      });
    });

    test("trims whitespace from document IDs", async () => {
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          documentIds: " 1 , 2 , 3 ",
        },
        mockDeleteResponse,
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await del.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].body).toEqual({
        documents: [
          { documentId: "1" },
          { documentId: "2" },
          { documentId: "3" },
        ],
      });
    });
  });

  describe("update operation", () => {
    test("calls API with PUT method for binary data source", async () => {
      const mockBuffer = Buffer.from("mock-pdf-bytes");

      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          documentId: "1",
          documentSource: "binaryData",
          binaryPropertyName: "data",
        },
        JSON.stringify(mockUpdateResponse),
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      (mockThis as any).helpers.getBinaryDataBuffer = mock(async () => mockBuffer);

      const result = await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("PUT");
      expect(ctx.apiCalls[0].endpoint).toBe("/envelopes/env-123/documents/1");
      expect(result).toHaveLength(1);
    });

    test("calls API with PUT method for URL source", async () => {
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          documentId: "1",
          documentSource: "url",
          documentUrl: "https://example.com/doc.pdf",
        },
        JSON.stringify(mockUpdateResponse),
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);

      const result = await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("PUT");
      expect(ctx.apiCalls[0].endpoint).toBe("/envelopes/env-123/documents/1");
      expect(result).toHaveLength(1);
    });
  });

  describe("updateList operation", () => {
    test("calls API with PUT method and multiple documents", async () => {
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          documents: {
            document: [
              {
                documentId: "1",
                name: "Doc 1",
                documentSource: "binaryData",
                binaryPropertyName: "data",
                fileExtension: "pdf",
              },
              {
                documentId: "2",
                name: "Doc 2",
                documentSource: "binaryData",
                binaryPropertyName: "file",
                fileExtension: "docx",
              },
            ],
          },
        },
        mockUpdateResponse,
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      (mockThis as any).helpers.getBinaryDataBuffer = mock(async () => Buffer.from("mock-content"));

      const result = await updateList.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("PUT");
      expect(ctx.apiCalls[0].endpoint).toBe("/envelopes/env-123/documents");

      const body = ctx.apiCalls[0].body as any;
      expect(body.documents).toHaveLength(2);
      expect(body.documents[0].documentId).toBe("1");
      expect(body.documents[0].name).toBe("Doc 1");
      expect(body.documents[0].fileExtension).toBe("pdf");
      expect(body.documents[0].documentBase64).toBeDefined();
      expect(body.documents[1].documentId).toBe("2");
      expect(body.documents[1].name).toBe("Doc 2");
      expect(body.documents[1].fileExtension).toBe("docx");
      expect(result).toHaveLength(1);
    });

    test("handles URL document source", async () => {
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          documents: {
            document: [
              {
                documentId: "1",
                name: "Remote Doc",
                documentSource: "url",
                documentUrl: "https://example.com/doc.pdf",
                fileExtension: "pdf",
              },
            ],
          },
        },
        mockUpdateResponse,
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);

      const result = await updateList.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      const body = ctx.apiCalls[0].body as any;
      expect(body.documents).toHaveLength(1);
      expect(body.documents[0].documentBase64).toBeDefined();
      expect(result).toHaveLength(1);
    });

    test("handles empty document list", async () => {
      ctx = createMockExecuteContext(
        {
          envelopeId: "env-123",
          documents: {
            document: [],
          },
        },
        mockUpdateResponse,
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);

      await updateList.execute.call(mockThis as any, 0);

      const body = ctx.apiCalls[0].body as any;
      expect(body.documents).toHaveLength(0);
    });
  });
});
