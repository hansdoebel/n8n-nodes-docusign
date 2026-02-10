import { describe, test, expect } from "bun:test";
import { users, operations } from "../../nodes/Docusign/resources/users";

describe("users resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("users")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("users object", () => {
    test("has create operation", () => {
      expect(users.create).toBeDefined();
      expect(users.create.execute).toBeDefined();
      expect(typeof users.create.execute).toBe("function");
    });

    test("has delete operation", () => {
      expect(users.delete).toBeDefined();
      expect(users.delete.execute).toBeDefined();
      expect(typeof users.delete.execute).toBe("function");
    });

    test("has get operation", () => {
      expect(users.get).toBeDefined();
      expect(users.get.execute).toBeDefined();
      expect(typeof users.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(users.list).toBeDefined();
      expect(users.list.execute).toBeDefined();
      expect(typeof users.list.execute).toBe("function");
    });

    test("has update operation", () => {
      expect(users.update).toBeDefined();
      expect(users.update.execute).toBeDefined();
      expect(typeof users.update.execute).toBe("function");
    });

    test("create has description", () => {
      expect(users.create.description).toBeDefined();
      expect(Array.isArray(users.create.description)).toBe(true);
    });

    test("delete has description", () => {
      expect(users.delete.description).toBeDefined();
      expect(Array.isArray(users.delete.description)).toBe(true);
    });

    test("get has description", () => {
      expect(users.get.description).toBeDefined();
      expect(Array.isArray(users.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(users.list.description).toBeDefined();
      expect(Array.isArray(users.list.description)).toBe(true);
    });

    test("update has description", () => {
      expect(users.update.description).toBeDefined();
      expect(Array.isArray(users.update.description)).toBe(true);
    });
  });
});
