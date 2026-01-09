import type { INodeProperties } from "n8n-workflow";

export const operations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["permissionProfiles"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a permission profile",
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a permission profile",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a permission profile",
      },
      {
        name: "List",
        value: "list",
        action: "List permission profiles",
      },
      {
        name: "Update",
        value: "update",
        action: "Update a permission profile",
      },
    ],
    default: "list",
  },
];
