import { describe, test, expect } from "bun:test";
import { envelopes, operations } from "../../nodes/Docusign/resources/envelopes";

describe("envelopes resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("envelopes")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("envelopes object", () => {
    test("has create operation", () => {
      expect(envelopes.create).toBeDefined();
      expect(envelopes.create.execute).toBeDefined();
      expect(typeof envelopes.create.execute).toBe("function");
    });

    test("has delete operation", () => {
      expect(envelopes.delete).toBeDefined();
      expect(envelopes.delete.execute).toBeDefined();
      expect(typeof envelopes.delete.execute).toBe("function");
    });

    test("has get operation", () => {
      expect(envelopes.get).toBeDefined();
      expect(envelopes.get.execute).toBeDefined();
      expect(typeof envelopes.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(envelopes.list).toBeDefined();
      expect(envelopes.list.execute).toBeDefined();
      expect(typeof envelopes.list.execute).toBe("function");
    });

    test("has update operation", () => {
      expect(envelopes.update).toBeDefined();
      expect(envelopes.update.execute).toBeDefined();
      expect(typeof envelopes.update.execute).toBe("function");
    });

    test("create has description", () => {
      expect(envelopes.create.description).toBeDefined();
      expect(Array.isArray(envelopes.create.description)).toBe(true);
    });

    test("delete has description", () => {
      expect(envelopes.delete.description).toBeDefined();
      expect(Array.isArray(envelopes.delete.description)).toBe(true);
    });

    test("get has description", () => {
      expect(envelopes.get.description).toBeDefined();
      expect(Array.isArray(envelopes.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(envelopes.list.description).toBeDefined();
      expect(Array.isArray(envelopes.list.description)).toBe(true);
    });

    test("update has description", () => {
      expect(envelopes.update.description).toBeDefined();
      expect(Array.isArray(envelopes.update.description)).toBe(true);
    });
  });

  describe("get operation description", () => {
    test("has envelopeId field", () => {
      const envelopeIdField = envelopes.get.description.find((d) => d.name === "envelopeId");
      expect(envelopeIdField).toBeDefined();
      expect(envelopeIdField?.type).toBe("string");
      expect(envelopeIdField?.required).toBe(true);
    });

    test("has additionalFields collection", () => {
      const additionalFields = envelopes.get.description.find((d) => d.name === "additionalFields");
      expect(additionalFields).toBeDefined();
      expect(additionalFields?.type).toBe("collection");
    });
  });
});
