import { describe, test, expect, mock, beforeEach } from "bun:test";
import {
  createMockExecuteContext,
  createMockExecuteFunctions,
  createMockApiRequest,
  mockOrganizationResponse,
  type MockExecuteContext,
} from "../helpers/mockApiRequest";

import * as get from "../../nodes/Docusign/resources/organizations/operations/get";

const mockDocusignApiRequest = mock();

mock.module("@utils", () => ({
  docusignApiRequest: mockDocusignApiRequest,
}));

describe("organizations API tests", () => {
  let ctx: MockExecuteContext;

  beforeEach(() => {
    mockDocusignApiRequest.mockReset();
  });

  describe("get operation", () => {
    test("calls API with correct endpoint", async () => {
      ctx = createMockExecuteContext(
        {
          organizationId: "org-123",
        },
        mockOrganizationResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/organizations/org-123");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(1);
    });
  });
});
