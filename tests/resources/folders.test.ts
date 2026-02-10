import { describe, test, expect } from "bun:test";
import { folders, operations } from "../../nodes/Docusign/resources/folders";

describe("folders resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("folders")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("folders object", () => {
    test("has get operation", () => {
      expect(folders.get).toBeDefined();
      expect(folders.get.execute).toBeDefined();
      expect(typeof folders.get.execute).toBe("function");
    });

    test("has getItems operation", () => {
      expect(folders.getItems).toBeDefined();
      expect(folders.getItems.execute).toBeDefined();
      expect(typeof folders.getItems.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(folders.list).toBeDefined();
      expect(folders.list.execute).toBeDefined();
      expect(typeof folders.list.execute).toBe("function");
    });

    test("get has description", () => {
      expect(folders.get.description).toBeDefined();
      expect(Array.isArray(folders.get.description)).toBe(true);
    });

    test("getItems has description", () => {
      expect(folders.getItems.description).toBeDefined();
      expect(Array.isArray(folders.getItems.description)).toBe(true);
    });

    test("list has description", () => {
      expect(folders.list.description).toBeDefined();
      expect(Array.isArray(folders.list.description)).toBe(true);
    });
  });
});
