import { describe, test, expect } from "bun:test";
import { billing, operations } from "../../nodes/Docusign/resources/billing";

describe("billing resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("billing")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("billing object", () => {
    test("has get operation", () => {
      expect(billing.get).toBeDefined();
      expect(billing.get.execute).toBeDefined();
      expect(typeof billing.get.execute).toBe("function");
    });

    test("has getCharges operation", () => {
      expect(billing.getCharges).toBeDefined();
      expect(billing.getCharges.execute).toBeDefined();
      expect(typeof billing.getCharges.execute).toBe("function");
    });

    test("has getInvoices operation", () => {
      expect(billing.getInvoices).toBeDefined();
      expect(billing.getInvoices.execute).toBeDefined();
      expect(typeof billing.getInvoices.execute).toBe("function");
    });

    test("get has description", () => {
      expect(billing.get.description).toBeDefined();
      expect(Array.isArray(billing.get.description)).toBe(true);
    });

    test("getCharges has description", () => {
      expect(billing.getCharges.description).toBeDefined();
      expect(Array.isArray(billing.getCharges.description)).toBe(true);
    });

    test("getInvoices has description", () => {
      expect(billing.getInvoices.description).toBeDefined();
      expect(Array.isArray(billing.getInvoices.description)).toBe(true);
    });
  });
});
