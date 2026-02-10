import { describe, test, expect } from "bun:test";
import { powerForms, operations } from "../../nodes/Docusign/resources/powerForms";

describe("powerForms resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("powerForms")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("powerForms object", () => {
    test("has create operation", () => {
      expect(powerForms.create).toBeDefined();
      expect(powerForms.create.execute).toBeDefined();
      expect(typeof powerForms.create.execute).toBe("function");
    });

    test("has delete operation", () => {
      expect(powerForms.delete).toBeDefined();
      expect(powerForms.delete.execute).toBeDefined();
      expect(typeof powerForms.delete.execute).toBe("function");
    });

    test("has get operation", () => {
      expect(powerForms.get).toBeDefined();
      expect(powerForms.get.execute).toBeDefined();
      expect(typeof powerForms.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(powerForms.list).toBeDefined();
      expect(powerForms.list.execute).toBeDefined();
      expect(typeof powerForms.list.execute).toBe("function");
    });

    test("has update operation", () => {
      expect(powerForms.update).toBeDefined();
      expect(powerForms.update.execute).toBeDefined();
      expect(typeof powerForms.update.execute).toBe("function");
    });

    test("create has description", () => {
      expect(powerForms.create.description).toBeDefined();
      expect(Array.isArray(powerForms.create.description)).toBe(true);
    });

    test("delete has description", () => {
      expect(powerForms.delete.description).toBeDefined();
      expect(Array.isArray(powerForms.delete.description)).toBe(true);
    });

    test("get has description", () => {
      expect(powerForms.get.description).toBeDefined();
      expect(Array.isArray(powerForms.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(powerForms.list.description).toBeDefined();
      expect(Array.isArray(powerForms.list.description)).toBe(true);
    });

    test("update has description", () => {
      expect(powerForms.update.description).toBeDefined();
      expect(Array.isArray(powerForms.update.description)).toBe(true);
    });
  });
});
