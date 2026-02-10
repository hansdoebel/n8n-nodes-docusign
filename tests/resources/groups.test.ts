import { describe, test, expect } from "bun:test";
import { groups, operations } from "../../nodes/Docusign/resources/groups";

describe("groups resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("groups")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("groups object", () => {
    test("has create operation", () => {
      expect(groups.create).toBeDefined();
      expect(groups.create.execute).toBeDefined();
      expect(typeof groups.create.execute).toBe("function");
    });

    test("has delete operation", () => {
      expect(groups.delete).toBeDefined();
      expect(groups.delete.execute).toBeDefined();
      expect(typeof groups.delete.execute).toBe("function");
    });

    test("has get operation", () => {
      expect(groups.get).toBeDefined();
      expect(groups.get.execute).toBeDefined();
      expect(typeof groups.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(groups.list).toBeDefined();
      expect(groups.list.execute).toBeDefined();
      expect(typeof groups.list.execute).toBe("function");
    });

    test("has update operation", () => {
      expect(groups.update).toBeDefined();
      expect(groups.update.execute).toBeDefined();
      expect(typeof groups.update.execute).toBe("function");
    });

    test("create has description", () => {
      expect(groups.create.description).toBeDefined();
      expect(Array.isArray(groups.create.description)).toBe(true);
    });

    test("delete has description", () => {
      expect(groups.delete.description).toBeDefined();
      expect(Array.isArray(groups.delete.description)).toBe(true);
    });

    test("get has description", () => {
      expect(groups.get.description).toBeDefined();
      expect(Array.isArray(groups.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(groups.list.description).toBeDefined();
      expect(Array.isArray(groups.list.description)).toBe(true);
    });

    test("update has description", () => {
      expect(groups.update.description).toBeDefined();
      expect(Array.isArray(groups.update.description)).toBe(true);
    });
  });
});
