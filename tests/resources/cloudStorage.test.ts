import { describe, test, expect } from "bun:test";
import { cloudStorage, operations } from "../../nodes/Docusign/resources/cloudStorage";

describe("cloudStorage resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("cloudStorage")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("cloudStorage object", () => {
    test("has delete operation", () => {
      expect(cloudStorage.delete).toBeDefined();
      expect(cloudStorage.delete.execute).toBeDefined();
      expect(typeof cloudStorage.delete.execute).toBe("function");
    });

    test("has get operation", () => {
      expect(cloudStorage.get).toBeDefined();
      expect(cloudStorage.get.execute).toBeDefined();
      expect(typeof cloudStorage.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(cloudStorage.list).toBeDefined();
      expect(cloudStorage.list.execute).toBeDefined();
      expect(typeof cloudStorage.list.execute).toBe("function");
    });

    test("delete has description", () => {
      expect(cloudStorage.delete.description).toBeDefined();
      expect(Array.isArray(cloudStorage.delete.description)).toBe(true);
    });

    test("get has description", () => {
      expect(cloudStorage.get.description).toBeDefined();
      expect(Array.isArray(cloudStorage.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(cloudStorage.list.description).toBeDefined();
      expect(Array.isArray(cloudStorage.list.description)).toBe(true);
    });
  });
});
