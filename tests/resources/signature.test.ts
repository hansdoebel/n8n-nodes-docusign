import { describe, test, expect } from "bun:test";
import { signature, operations } from "../../nodes/Docusign/resources/signature";

describe("signature resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("signature")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("signature object", () => {
    test("has create operation", () => {
      expect(signature.create).toBeDefined();
      expect(signature.create.execute).toBeDefined();
      expect(typeof signature.create.execute).toBe("function");
    });

    test("has delete operation", () => {
      expect(signature.delete).toBeDefined();
      expect(signature.delete.execute).toBeDefined();
      expect(typeof signature.delete.execute).toBe("function");
    });

    test("has get operation", () => {
      expect(signature.get).toBeDefined();
      expect(signature.get.execute).toBeDefined();
      expect(typeof signature.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(signature.list).toBeDefined();
      expect(signature.list.execute).toBeDefined();
      expect(typeof signature.list.execute).toBe("function");
    });

    test("has update operation", () => {
      expect(signature.update).toBeDefined();
      expect(signature.update.execute).toBeDefined();
      expect(typeof signature.update.execute).toBe("function");
    });

    test("create has description", () => {
      expect(signature.create.description).toBeDefined();
      expect(Array.isArray(signature.create.description)).toBe(true);
    });

    test("delete has description", () => {
      expect(signature.delete.description).toBeDefined();
      expect(Array.isArray(signature.delete.description)).toBe(true);
    });

    test("get has description", () => {
      expect(signature.get.description).toBeDefined();
      expect(Array.isArray(signature.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(signature.list.description).toBeDefined();
      expect(Array.isArray(signature.list.description)).toBe(true);
    });

    test("update has description", () => {
      expect(signature.update.description).toBeDefined();
      expect(Array.isArray(signature.update.description)).toBe(true);
    });
  });
});
