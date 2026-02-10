import { describe, test, expect } from "bun:test";
import { templates, operations } from "../../nodes/Docusign/resources/templates";

describe("templates resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("templates")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("templates object", () => {
    test("has create operation", () => {
      expect(templates.create).toBeDefined();
      expect(templates.create.execute).toBeDefined();
      expect(typeof templates.create.execute).toBe("function");
    });

    test("has delete operation", () => {
      expect(templates.delete).toBeDefined();
      expect(templates.delete.execute).toBeDefined();
      expect(typeof templates.delete.execute).toBe("function");
    });

    test("has get operation", () => {
      expect(templates.get).toBeDefined();
      expect(templates.get.execute).toBeDefined();
      expect(typeof templates.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(templates.list).toBeDefined();
      expect(templates.list.execute).toBeDefined();
      expect(typeof templates.list.execute).toBe("function");
    });

    test("has update operation", () => {
      expect(templates.update).toBeDefined();
      expect(templates.update.execute).toBeDefined();
      expect(typeof templates.update.execute).toBe("function");
    });

    test("create has description", () => {
      expect(templates.create.description).toBeDefined();
      expect(Array.isArray(templates.create.description)).toBe(true);
    });

    test("delete has description", () => {
      expect(templates.delete.description).toBeDefined();
      expect(Array.isArray(templates.delete.description)).toBe(true);
    });

    test("get has description", () => {
      expect(templates.get.description).toBeDefined();
      expect(Array.isArray(templates.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(templates.list.description).toBeDefined();
      expect(Array.isArray(templates.list.description)).toBe(true);
    });

    test("update has description", () => {
      expect(templates.update.description).toBeDefined();
      expect(Array.isArray(templates.update.description)).toBe(true);
    });
  });
});
