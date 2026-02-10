import { describe, test, expect } from "bun:test";
import { permissionProfiles, operations } from "../../nodes/Docusign/resources/permissionProfiles";

describe("permissionProfiles resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("permissionProfiles")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("permissionProfiles object", () => {
    test("has create operation", () => {
      expect(permissionProfiles.create).toBeDefined();
      expect(permissionProfiles.create.execute).toBeDefined();
      expect(typeof permissionProfiles.create.execute).toBe("function");
    });

    test("has delete operation", () => {
      expect(permissionProfiles.delete).toBeDefined();
      expect(permissionProfiles.delete.execute).toBeDefined();
      expect(typeof permissionProfiles.delete.execute).toBe("function");
    });

    test("has get operation", () => {
      expect(permissionProfiles.get).toBeDefined();
      expect(permissionProfiles.get.execute).toBeDefined();
      expect(typeof permissionProfiles.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(permissionProfiles.list).toBeDefined();
      expect(permissionProfiles.list.execute).toBeDefined();
      expect(typeof permissionProfiles.list.execute).toBe("function");
    });

    test("has update operation", () => {
      expect(permissionProfiles.update).toBeDefined();
      expect(permissionProfiles.update.execute).toBeDefined();
      expect(typeof permissionProfiles.update.execute).toBe("function");
    });

    test("create has description", () => {
      expect(permissionProfiles.create.description).toBeDefined();
      expect(Array.isArray(permissionProfiles.create.description)).toBe(true);
    });

    test("delete has description", () => {
      expect(permissionProfiles.delete.description).toBeDefined();
      expect(Array.isArray(permissionProfiles.delete.description)).toBe(true);
    });

    test("get has description", () => {
      expect(permissionProfiles.get.description).toBeDefined();
      expect(Array.isArray(permissionProfiles.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(permissionProfiles.list.description).toBeDefined();
      expect(Array.isArray(permissionProfiles.list.description)).toBe(true);
    });

    test("update has description", () => {
      expect(permissionProfiles.update.description).toBeDefined();
      expect(Array.isArray(permissionProfiles.update.description)).toBe(true);
    });
  });
});
