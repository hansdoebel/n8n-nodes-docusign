import { describe, test, expect } from "bun:test";
import { connect, operations } from "../../nodes/Docusign/resources/connect";

describe("connect resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("connect")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("connect object", () => {
    test("has create operation", () => {
      expect(connect.create).toBeDefined();
      expect(connect.create.execute).toBeDefined();
      expect(typeof connect.create.execute).toBe("function");
    });

    test("has delete operation", () => {
      expect(connect.delete).toBeDefined();
      expect(connect.delete.execute).toBeDefined();
      expect(typeof connect.delete.execute).toBe("function");
    });

    test("has get operation", () => {
      expect(connect.get).toBeDefined();
      expect(connect.get.execute).toBeDefined();
      expect(typeof connect.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(connect.list).toBeDefined();
      expect(connect.list.execute).toBeDefined();
      expect(typeof connect.list.execute).toBe("function");
    });

    test("has update operation", () => {
      expect(connect.update).toBeDefined();
      expect(connect.update.execute).toBeDefined();
      expect(typeof connect.update.execute).toBe("function");
    });

    test("create has description", () => {
      expect(connect.create.description).toBeDefined();
      expect(Array.isArray(connect.create.description)).toBe(true);
    });

    test("delete has description", () => {
      expect(connect.delete.description).toBeDefined();
      expect(Array.isArray(connect.delete.description)).toBe(true);
    });

    test("get has description", () => {
      expect(connect.get.description).toBeDefined();
      expect(Array.isArray(connect.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(connect.list.description).toBeDefined();
      expect(Array.isArray(connect.list.description)).toBe(true);
    });

    test("update has description", () => {
      expect(connect.update.description).toBeDefined();
      expect(Array.isArray(connect.update.description)).toBe(true);
    });
  });
});
