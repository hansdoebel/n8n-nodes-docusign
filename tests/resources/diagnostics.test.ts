import { describe, test, expect } from "bun:test";
import { diagnostics, operations } from "../../nodes/Docusign/resources/diagnostics";

describe("diagnostics resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("diagnostics")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("diagnostics object", () => {
    test("has delete operation", () => {
      expect(diagnostics.delete).toBeDefined();
      expect(diagnostics.delete.execute).toBeDefined();
      expect(typeof diagnostics.delete.execute).toBe("function");
    });

    test("has get operation", () => {
      expect(diagnostics.get).toBeDefined();
      expect(diagnostics.get.execute).toBeDefined();
      expect(typeof diagnostics.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(diagnostics.list).toBeDefined();
      expect(diagnostics.list.execute).toBeDefined();
      expect(typeof diagnostics.list.execute).toBe("function");
    });

    test("delete has description", () => {
      expect(diagnostics.delete.description).toBeDefined();
      expect(Array.isArray(diagnostics.delete.description)).toBe(true);
    });

    test("get has description", () => {
      expect(diagnostics.get.description).toBeDefined();
      expect(Array.isArray(diagnostics.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(diagnostics.list.description).toBeDefined();
      expect(Array.isArray(diagnostics.list.description)).toBe(true);
    });
  });
});
