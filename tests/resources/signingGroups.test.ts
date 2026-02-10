import { describe, test, expect } from "bun:test";
import { signingGroups, operations } from "../../nodes/Docusign/resources/signingGroups";

describe("signingGroups resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("signingGroups")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("signingGroups object", () => {
    test("has create operation", () => {
      expect(signingGroups.create).toBeDefined();
      expect(signingGroups.create.execute).toBeDefined();
      expect(typeof signingGroups.create.execute).toBe("function");
    });

    test("has delete operation", () => {
      expect(signingGroups.delete).toBeDefined();
      expect(signingGroups.delete.execute).toBeDefined();
      expect(typeof signingGroups.delete.execute).toBe("function");
    });

    test("has get operation", () => {
      expect(signingGroups.get).toBeDefined();
      expect(signingGroups.get.execute).toBeDefined();
      expect(typeof signingGroups.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(signingGroups.list).toBeDefined();
      expect(signingGroups.list.execute).toBeDefined();
      expect(typeof signingGroups.list.execute).toBe("function");
    });

    test("has update operation", () => {
      expect(signingGroups.update).toBeDefined();
      expect(signingGroups.update.execute).toBeDefined();
      expect(typeof signingGroups.update.execute).toBe("function");
    });

    test("create has description", () => {
      expect(signingGroups.create.description).toBeDefined();
      expect(Array.isArray(signingGroups.create.description)).toBe(true);
    });

    test("delete has description", () => {
      expect(signingGroups.delete.description).toBeDefined();
      expect(Array.isArray(signingGroups.delete.description)).toBe(true);
    });

    test("get has description", () => {
      expect(signingGroups.get.description).toBeDefined();
      expect(Array.isArray(signingGroups.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(signingGroups.list.description).toBeDefined();
      expect(Array.isArray(signingGroups.list.description)).toBe(true);
    });

    test("update has description", () => {
      expect(signingGroups.update.description).toBeDefined();
      expect(Array.isArray(signingGroups.update.description)).toBe(true);
    });
  });
});
