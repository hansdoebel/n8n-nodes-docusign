import { describe, test, expect } from "bun:test";
import { workspaces, operations } from "../../nodes/Docusign/resources/workspaces";

describe("workspaces resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("workspaces")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("workspaces object", () => {
    test("has create operation", () => {
      expect(workspaces.create).toBeDefined();
      expect(workspaces.create.execute).toBeDefined();
      expect(typeof workspaces.create.execute).toBe("function");
    });

    test("has delete operation", () => {
      expect(workspaces.delete).toBeDefined();
      expect(workspaces.delete.execute).toBeDefined();
      expect(typeof workspaces.delete.execute).toBe("function");
    });

    test("has get operation", () => {
      expect(workspaces.get).toBeDefined();
      expect(workspaces.get.execute).toBeDefined();
      expect(typeof workspaces.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(workspaces.list).toBeDefined();
      expect(workspaces.list.execute).toBeDefined();
      expect(typeof workspaces.list.execute).toBe("function");
    });

    test("has update operation", () => {
      expect(workspaces.update).toBeDefined();
      expect(workspaces.update.execute).toBeDefined();
      expect(typeof workspaces.update.execute).toBe("function");
    });

    test("create has description", () => {
      expect(workspaces.create.description).toBeDefined();
      expect(Array.isArray(workspaces.create.description)).toBe(true);
    });

    test("delete has description", () => {
      expect(workspaces.delete.description).toBeDefined();
      expect(Array.isArray(workspaces.delete.description)).toBe(true);
    });

    test("get has description", () => {
      expect(workspaces.get.description).toBeDefined();
      expect(Array.isArray(workspaces.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(workspaces.list.description).toBeDefined();
      expect(Array.isArray(workspaces.list.description)).toBe(true);
    });

    test("update has description", () => {
      expect(workspaces.update.description).toBeDefined();
      expect(Array.isArray(workspaces.update.description)).toBe(true);
    });
  });
});
