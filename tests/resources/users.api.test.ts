import { describe, test, expect, mock, beforeEach } from "bun:test";
import {
  createMockExecuteContext,
  createMockExecuteFunctions,
  createMockApiRequest,
  mockUserResponse,
  mockUserListResponse,
  mockDeleteResponse,
  type MockExecuteContext,
} from "../helpers/mockApiRequest";

import * as get from "../../nodes/Docusign/resources/users/operations/get";
import * as list from "../../nodes/Docusign/resources/users/operations/list";
import * as del from "../../nodes/Docusign/resources/users/operations/delete";
import * as update from "../../nodes/Docusign/resources/users/operations/update";

const mockDocusignApiRequest = mock();

mock.module("@utils", () => ({
  docusignApiRequest: mockDocusignApiRequest,
}));

describe("users API tests", () => {
  let ctx: MockExecuteContext;

  beforeEach(() => {
    mockDocusignApiRequest.mockReset();
  });

  describe("get operation", () => {
    test("calls API with correct endpoint and empty body", async () => {
      ctx = createMockExecuteContext(
        {
          userId: "user-123",
          additionalFields: {},
        },
        mockUserResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/users/user-123");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(1);
      expect(result[0].json.userId).toBe("user-123");
    });

    test("includes additional_info query param", async () => {
      ctx = createMockExecuteContext(
        {
          userId: "user-123",
          additionalFields: {
            additional_info: true,
          },
        },
        mockUserResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await get.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].query?.additional_info).toBe(true);
    });
  });

  describe("list operation", () => {
    test("calls API with correct endpoint and empty body", async () => {
      ctx = createMockExecuteContext(
        {
          returnAll: false,
          limit: 20,
          additionalFields: {},
        },
        mockUserListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("GET");
      expect(ctx.apiCalls[0].endpoint).toBe("/users");
      expect(ctx.apiCalls[0].body).toEqual({});
      expect(result).toHaveLength(2);
    });

    test("applies filter parameters", async () => {
      ctx = createMockExecuteContext(
        {
          returnAll: true,
          additionalFields: {
            status: "active",
            email: "test@example.com",
            user_name_substring: "john",
          },
        },
        mockUserListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await list.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].query?.status).toBe("active");
      expect(ctx.apiCalls[0].query?.email).toBe("test@example.com");
      expect(ctx.apiCalls[0].query?.user_name_substring).toBe("john");
    });

    test("returns users array from response", async () => {
      ctx = createMockExecuteContext(
        {
          returnAll: true,
          additionalFields: {},
        },
        mockUserListResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      const result = await list.execute.call(mockThis as any, 0);

      expect(result).toHaveLength(2);
      expect(result[0].json.userId).toBe("user-123");
      expect(result[1].json.userId).toBe("user-456");
    });
  });

  describe("delete operation", () => {
    test("calls API with DELETE method and users array body", async () => {
      ctx = createMockExecuteContext(
        {
          userId: "user-123",
        },
        mockDeleteResponse
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await del.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("DELETE");
      expect(ctx.apiCalls[0].endpoint).toBe("/users");
      expect(ctx.apiCalls[0].body).toEqual({
        users: [{ userId: "user-123" }],
      });
    });
  });

  describe("update operation", () => {
    test("calls API with PUT method and users array body", async () => {
      ctx = createMockExecuteContext(
        {
          userId: "user-123",
          additionalFields: {
            firstName: "Updated",
            lastName: "User",
          },
        },
        { users: [mockUserResponse] }
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls).toHaveLength(1);
      expect(ctx.apiCalls[0].method).toBe("PUT");
      expect(ctx.apiCalls[0].endpoint).toBe("/users");
      expect(ctx.apiCalls[0].body).toEqual({
        users: [
          {
            userId: "user-123",
            firstName: "Updated",
            lastName: "User",
          },
        ],
      });
    });

    test("includes all user fields in body", async () => {
      ctx = createMockExecuteContext(
        {
          userId: "user-123",
          additionalFields: {
            email: "updated@example.com",
            userName: "updateduser",
            firstName: "John",
            lastName: "Doe",
            middleName: "M",
            company: "ACME Corp",
            jobTitle: "Manager",
            userStatus: "active",
          },
        },
        { users: [mockUserResponse] }
      );

      const mockFn = createMockApiRequest(ctx);
      mockDocusignApiRequest.mockImplementation(mockFn);

      const mockThis = createMockExecuteFunctions(ctx);
      await update.execute.call(mockThis as any, 0);

      expect(ctx.apiCalls[0].body).toEqual({
        users: [
          {
            userId: "user-123",
            email: "updated@example.com",
            userName: "updateduser",
            firstName: "John",
            lastName: "Doe",
            middleName: "M",
            company: "ACME Corp",
            jobTitle: "Manager",
            userStatus: "active",
          },
        ],
      });
    });
  });
});
