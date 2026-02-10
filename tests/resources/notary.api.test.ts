import { describe, test, expect, mock, beforeEach } from "bun:test";
import {
  createMockExecuteContext,
  createMockExecuteFunctions,
  createMockApiRequest,
  mockNotaryResponse,
  mockNotaryListResponse,
  type MockExecuteContext,
} from "../helpers/mockApiRequest";

import * as get from "../../nodes/Docusign/resources/notary/operations/get";
import * as list from "../../nodes/Docusign/resources/notary/operations/list";

const mockDocusignApiRequest = mock();

mock.module("@utils", () => ({
  docusignApiRequest: mockDocusignApiRequest,
}));

describe("notary API tests", () => {
  let ctx: MockExecuteContext;

  beforeEach(() => {
    mockDocusignApiRequest.mockReset();
  });

  describe("get operation", () => {
    test("calls API with correct endpoint", async () => {
      ctx = createMockExecuteContext(
        {
          journalId: "journal-123",
        },
        mockNotaryResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/notary/journals/journal-123");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(1);
    });
  });

  describe("list operation", () => {
    test("calls API with correct endpoint", async () => {
      const mockJournalsResponse = {
        notaryJournals: [
          { journalId: "journal-123", name: "Test Journal" },
        ],
      };

      ctx = createMockExecuteContext(
        {
          additionalFields: {},
        },
        mockJournalsResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/notary/journals");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(1);
    });
  });
});
