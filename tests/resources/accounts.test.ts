import { describe, test, expect } from "bun:test";
import { accounts, operations } from "../../nodes/Docusign/resources/accounts";

describe("accounts resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("accounts")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("accounts object", () => {
    test("has get operation", () => {
      expect(accounts.get).toBeDefined();
      expect(accounts.get.execute).toBeDefined();
      expect(typeof accounts.get.execute).toBe("function");
    });

    test("has getBrands operation", () => {
      expect(accounts.getBrands).toBeDefined();
      expect(accounts.getBrands.execute).toBeDefined();
      expect(typeof accounts.getBrands.execute).toBe("function");
    });

    test("get has description", () => {
      expect(accounts.get.description).toBeDefined();
      expect(Array.isArray(accounts.get.description)).toBe(true);
    });

    test("getBrands has description", () => {
      expect(accounts.getBrands.description).toBeDefined();
      expect(Array.isArray(accounts.getBrands.description)).toBe(true);
    });
  });
});
