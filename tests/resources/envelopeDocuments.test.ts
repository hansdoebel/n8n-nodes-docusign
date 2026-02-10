import { describe, test, expect } from "bun:test";
import { envelopeDocuments, operations } from "../../nodes/Docusign/resources/envelopeDocuments";

describe("envelopeDocuments resource", () => {
  describe("operations export", () => {
    test("exports operations array", () => {
      expect(operations).toBeDefined();
      expect(Array.isArray(operations)).toBe(true);
    });

    test("operations has resource operation definition", () => {
      const operationDef = operations.find(
        (op) => op.name === "operation" && op.displayOptions?.show?.resource?.includes("envelopeDocuments")
      );
      expect(operationDef).toBeDefined();
    });
  });

  describe("envelopeDocuments object", () => {
    test("has delete operation", () => {
      expect(envelopeDocuments.delete).toBeDefined();
      expect(envelopeDocuments.delete.execute).toBeDefined();
      expect(typeof envelopeDocuments.delete.execute).toBe("function");
    });

    test("has get operation", () => {
      expect(envelopeDocuments.get).toBeDefined();
      expect(envelopeDocuments.get.execute).toBeDefined();
      expect(typeof envelopeDocuments.get.execute).toBe("function");
    });

    test("has list operation", () => {
      expect(envelopeDocuments.list).toBeDefined();
      expect(envelopeDocuments.list.execute).toBeDefined();
      expect(typeof envelopeDocuments.list.execute).toBe("function");
    });

    test("has update operation", () => {
      expect(envelopeDocuments.update).toBeDefined();
      expect(envelopeDocuments.update.execute).toBeDefined();
      expect(typeof envelopeDocuments.update.execute).toBe("function");
    });

    test("has updateList operation", () => {
      expect(envelopeDocuments.updateList).toBeDefined();
      expect(envelopeDocuments.updateList.execute).toBeDefined();
      expect(typeof envelopeDocuments.updateList.execute).toBe("function");
    });

    test("delete has description", () => {
      expect(envelopeDocuments.delete.description).toBeDefined();
      expect(Array.isArray(envelopeDocuments.delete.description)).toBe(true);
    });

    test("get has description", () => {
      expect(envelopeDocuments.get.description).toBeDefined();
      expect(Array.isArray(envelopeDocuments.get.description)).toBe(true);
    });

    test("list has description", () => {
      expect(envelopeDocuments.list.description).toBeDefined();
      expect(Array.isArray(envelopeDocuments.list.description)).toBe(true);
    });

    test("update has description", () => {
      expect(envelopeDocuments.update.description).toBeDefined();
      expect(Array.isArray(envelopeDocuments.update.description)).toBe(true);
    });

    test("updateList has description", () => {
      expect(envelopeDocuments.updateList.description).toBeDefined();
      expect(Array.isArray(envelopeDocuments.updateList.description)).toBe(true);
    });
  });

  describe("get operation description", () => {
    test("has envelopeId field", () => {
      const envelopeIdField = envelopeDocuments.get.description.find((d) => d.name === "envelopeId");
      expect(envelopeIdField).toBeDefined();
      expect(envelopeIdField?.type).toBe("string");
      expect(envelopeIdField?.required).toBe(true);
    });

    test("has documentId field", () => {
      const documentIdField = envelopeDocuments.get.description.find((d) => d.name === "documentId");
      expect(documentIdField).toBeDefined();
      expect(documentIdField?.type).toBe("options");
      expect(documentIdField?.required).toBe(true);
    });

    test("has additionalFields collection", () => {
      const additionalFields = envelopeDocuments.get.description.find((d) => d.name === "additionalFields");
      expect(additionalFields).toBeDefined();
      expect(additionalFields?.type).toBe("collection");
    });
  });

  describe("list operation description", () => {
    test("has envelopeId field", () => {
      const envelopeIdField = envelopeDocuments.list.description.find((d) => d.name === "envelopeId");
      expect(envelopeIdField).toBeDefined();
      expect(envelopeIdField?.type).toBe("string");
      expect(envelopeIdField?.required).toBe(true);
    });
  });

  describe("delete operation description", () => {
    test("has envelopeId field", () => {
      const envelopeIdField = envelopeDocuments.delete.description.find((d) => d.name === "envelopeId");
      expect(envelopeIdField).toBeDefined();
      expect(envelopeIdField?.type).toBe("string");
      expect(envelopeIdField?.required).toBe(true);
    });

    test("has documentIds field", () => {
      const documentIdsField = envelopeDocuments.delete.description.find((d) => d.name === "documentIds");
      expect(documentIdsField).toBeDefined();
      expect(documentIdsField?.type).toBe("string");
      expect(documentIdsField?.required).toBe(true);
    });
  });

  describe("update operation description", () => {
    test("has envelopeId field", () => {
      const envelopeIdField = envelopeDocuments.update.description.find((d) => d.name === "envelopeId");
      expect(envelopeIdField).toBeDefined();
      expect(envelopeIdField?.type).toBe("string");
      expect(envelopeIdField?.required).toBe(true);
    });

    test("has documentId field", () => {
      const documentIdField = envelopeDocuments.update.description.find((d) => d.name === "documentId");
      expect(documentIdField).toBeDefined();
      expect(documentIdField?.type).toBe("string");
      expect(documentIdField?.required).toBe(true);
    });

    test("has documentSource field", () => {
      const sourceField = envelopeDocuments.update.description.find((d) => d.name === "documentSource");
      expect(sourceField).toBeDefined();
      expect(sourceField?.type).toBe("options");
    });
  });

  describe("updateList operation description", () => {
    test("has envelopeId field", () => {
      const envelopeIdField = envelopeDocuments.updateList.description.find((d) => d.name === "envelopeId");
      expect(envelopeIdField).toBeDefined();
      expect(envelopeIdField?.type).toBe("string");
      expect(envelopeIdField?.required).toBe(true);
    });

    test("has documents fixedCollection field", () => {
      const documentsField = envelopeDocuments.updateList.description.find((d) => d.name === "documents");
      expect(documentsField).toBeDefined();
      expect(documentsField?.type).toBe("fixedCollection");
      expect(documentsField?.required).toBe(true);
    });
  });
});
