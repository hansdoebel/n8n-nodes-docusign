import { describe, test, expect } from "bun:test";
import { customTabs, operations } from "../../nodes/Docusign/resources/customTabs";

describe("customTabs resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("customTabs")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("customTabs object", () => {
    test("has create operation", () => {
      expect(customTabs.create).toBeDefined();
      expect(customTabs.create.execute).toBeDefined();
      expect(typeof customTabs.create.execute).toBe("function");
    });

    test("has delete operation", () => {
      expect(customTabs.delete).toBeDefined();
      expect(customTabs.delete.execute).toBeDefined();
      expect(typeof customTabs.delete.execute).toBe("function");
    });

    test("has get operation", () => {
      expect(customTabs.get).toBeDefined();
      expect(customTabs.get.execute).toBeDefined();
      expect(typeof customTabs.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(customTabs.list).toBeDefined();
      expect(customTabs.list.execute).toBeDefined();
      expect(typeof customTabs.list.execute).toBe("function");
    });

    test("has update operation", () => {
      expect(customTabs.update).toBeDefined();
      expect(customTabs.update.execute).toBeDefined();
      expect(typeof customTabs.update.execute).toBe("function");
    });

    test("create has description", () => {
      expect(customTabs.create.description).toBeDefined();
      expect(Array.isArray(customTabs.create.description)).toBe(true);
    });

    test("delete has description", () => {
      expect(customTabs.delete.description).toBeDefined();
      expect(Array.isArray(customTabs.delete.description)).toBe(true);
    });

    test("get has description", () => {
      expect(customTabs.get.description).toBeDefined();
      expect(Array.isArray(customTabs.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(customTabs.list.description).toBeDefined();
      expect(Array.isArray(customTabs.list.description)).toBe(true);
    });

    test("update has description", () => {
      expect(customTabs.update.description).toBeDefined();
      expect(Array.isArray(customTabs.update.description)).toBe(true);
    });
  });
});
