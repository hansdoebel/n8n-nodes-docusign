import { describe, test, expect } from "bun:test";
import { notary, operations } from "../../nodes/Docusign/resources/notary";

describe("notary resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("notary")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("notary object", () => {
    test("has get operation", () => {
      expect(notary.get).toBeDefined();
      expect(notary.get.execute).toBeDefined();
      expect(typeof notary.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(notary.list).toBeDefined();
      expect(notary.list.execute).toBeDefined();
      expect(typeof notary.list.execute).toBe("function");
    });

    test("get has description", () => {
      expect(notary.get.description).toBeDefined();
      expect(Array.isArray(notary.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(notary.list.description).toBeDefined();
      expect(Array.isArray(notary.list.description)).toBe(true);
    });
  });
});
