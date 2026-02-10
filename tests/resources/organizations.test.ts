import { describe, test, expect } from "bun:test";
import { organizations, operations } from "../../nodes/Docusign/resources/organizations";

describe("organizations resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("organizations")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("organizations object", () => {
    test("has get operation", () => {
      expect(organizations.get).toBeDefined();
      expect(organizations.get.execute).toBeDefined();
      expect(typeof organizations.get.execute).toBe("function");
    });

    test("get has description", () => {
      expect(organizations.get.description).toBeDefined();
      expect(Array.isArray(organizations.get.description)).toBe(true);
    });
  });
});
