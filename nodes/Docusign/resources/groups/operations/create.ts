import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";

export const description: INodeProperties[] = [
  {
    displayName: "Group Name",
    name: "groupName",
    type: "string",
    required: true,
    default: "",
  },
  {
    displayName: "Users",
    name: "users",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    placeholder: "Add User",
    options: [
      {
        name: "userList",
        displayName: "Users",
        values: [
          {
            displayName: "User ID",
            name: "userId",
            type: "string",
            required: true,
            default: "",
          },
          {
            displayName: "User Name",
            name: "userName",
            type: "string",
            default: "",
          },
          {
            displayName: "Email",
            name: "email",
            type: "string",
												placeholder: 'name@email.com',
            default: "",
          },
        ],
      },
    ],
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "DS Group ID",
        name: "dsGroupId",
        type: "string",
        default: "",
      },
      {
        displayName: "Group Type",
        name: "groupType",
        type: "options",
        default: "customGroup",
        options: [
          { name: "Admin Group", value: "adminGroup" },
          { name: "Custom Group", value: "customGroup" },
          { name: "Everyone Group", value: "everyoneGroup" },
        ],
      },
      {
        displayName: "Permission Profile ID",
        name: "permissionProfileId",
        type: "string",
        default: "",
      },
      {
        displayName: "Permission Profile Name",
        name: "permissionProfileName",
        type: "string",
        default: "",
      },
    ],
  },
  {
    displayName: "Brand Associations",
    name: "brands",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    placeholder: "Add Brand",
    options: [
      {
        name: "brandList",
        displayName: "Brands",
        values: [
          {
            displayName: "Brand ID",
            name: "brandId",
            type: "string",
            required: true,
            default: "",
          },
          {
            displayName: "Brand Name",
            name: "brandName",
            type: "string",
            default: "",
          },
        ],
      },
    ],
  },
];

export async function execute(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const groupName = this.getNodeParameter("groupName", index) as string;
  const usersData = this.getNodeParameter("users", index, {}) as IDataObject;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;
  const brandsData = this.getNodeParameter("brands", index, {}) as IDataObject;

  const group: IDataObject = {
    groupName,
    groupType: additionalFields.groupType || "customGroup",
  };

  if (additionalFields.permissionProfileId) {
    group.permissionProfileId = additionalFields.permissionProfileId;
  }

  if (additionalFields.permissionProfileName) {
    group.permissionProfileName = additionalFields.permissionProfileName;
  }

  if (additionalFields.dsGroupId) {
    group.dsGroupId = additionalFields.dsGroupId;
  }

  if (usersData.userList && Array.isArray(usersData.userList)) {
    group.users = (usersData.userList as IDataObject[]).map((user) => {
      const userObj: IDataObject = {};
      if (user.userId) {
        userObj.userId = user.userId;
      }
      if (user.userName) {
        userObj.userName = user.userName;
      }
      if (user.email) {
        userObj.email = user.email;
      }
      return userObj;
    });
  }

  if (brandsData.brandList && Array.isArray(brandsData.brandList)) {
    group.brands = (brandsData.brandList as IDataObject[]).map((brand) => {
      const brandObj: IDataObject = {};
      if (brand.brandId) {
        brandObj.brandId = brand.brandId;
      }
      if (brand.brandName) {
        brandObj.brandName = brand.brandName;
      }
      return brandObj;
    });
  }

  const body: IDataObject = {
    groups: [group],
  };

  const response = await docusignApiRequest.call(
    this,
    "POST",
    "/groups",
    body,
  );

  return this.helpers.returnJsonArray(response.groups || []);
}
