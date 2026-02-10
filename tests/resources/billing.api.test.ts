import { describe, test, expect, mock, beforeEach } from "bun:test";
import {
  createMockExecuteContext,
  createMockExecuteFunctions,
  createMockApiRequest,
  mockBillingResponse,
  type MockExecuteContext,
} from "../helpers/mockApiRequest";

import * as get from "../../nodes/Docusign/resources/billing/operations/get";
import * as getCharges from "../../nodes/Docusign/resources/billing/operations/getCharges";
import * as getInvoices from "../../nodes/Docusign/resources/billing/operations/getInvoices";

const mockDocusignApiRequest = mock();

mock.module("@utils", () => ({
  docusignApiRequest: mockDocusignApiRequest,
}));

describe("billing API tests", () => {
  let ctx: MockExecuteContext;

  beforeEach(() => {
    mockDocusignApiRequest.mockReset();
  });

  describe("get operation", () => {
    test("calls API with correct endpoint", async () => {
      ctx = createMockExecuteContext(
        {},
        mockBillingResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/billing_plan");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(1);
    });
  });

  describe("getCharges operation", () => {
    test("calls API with correct endpoint", async () => {
      const mockChargesResponse = {
        billingCharges: [
          { chargeName: "Envelope Sent", chargeAmount: "1.00" },
        ],
      };

      ctx = createMockExecuteContext(
        {
          additionalFields: {},
        },
        mockChargesResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await getCharges.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/billing_charges");
      expect(ctx.apiCalls[0].body).toEqual({});
    });
  });

  describe("getInvoices operation", () => {
    test("calls API with correct endpoint", async () => {
      const mockInvoicesResponse = {
        invoices: [
          { invoiceId: "inv-123", amount: "100.00" },
        ],
      };

      ctx = createMockExecuteContext(
        {
          additionalFields: {},
        },
        mockInvoicesResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await getInvoices.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/billing_invoices");
      expect(ctx.apiCalls[0].body).toEqual({});
    });
  });
});
