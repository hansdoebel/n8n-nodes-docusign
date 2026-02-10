import { describe, test, expect } from "bun:test";
import { bulkEnvelopes, operations } from "../../nodes/Docusign/resources/bulkEnvelopes";

describe("bulkEnvelopes resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("bulkEnvelopes")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("bulkEnvelopes object", () => {
    test("has get operation", () => {
      expect(bulkEnvelopes.get).toBeDefined();
      expect(bulkEnvelopes.get.execute).toBeDefined();
      expect(typeof bulkEnvelopes.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(bulkEnvelopes.list).toBeDefined();
      expect(bulkEnvelopes.list.execute).toBeDefined();
      expect(typeof bulkEnvelopes.list.execute).toBe("function");
    });

    test("get has description", () => {
      expect(bulkEnvelopes.get.description).toBeDefined();
      expect(Array.isArray(bulkEnvelopes.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(bulkEnvelopes.list.description).toBeDefined();
      expect(Array.isArray(bulkEnvelopes.list.description)).toBe(true);
    });
  });
});
