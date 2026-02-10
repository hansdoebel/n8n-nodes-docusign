import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";
import { docusignApiRequest } from "@utils";

export const description: INodeProperties[] = [
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    required: true,
    default: "",
  },
  {
    displayName: "User Name",
    name: "userName",
    type: "string",
    required: true,
    default: "",
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Activation Access Code",
        name: "activationAccessCode",
        type: "string",
        default: "",
      },
      {
        displayName: "Company",
        name: "company",
        type: "string",
        default: "",
      },
      {
        displayName: "Country Code",
        name: "countryCode",
        type: "string",
        default: "",
      },
      {
        displayName: "Default Account ID",
        name: "defaultAccountId",
        type: "string",
        default: "",
      },
      {
        displayName: "Enable Connect for User",
        name: "enableConnectForUser",
        type: "boolean",
        default: false,
      },
      {
        displayName: "First Name",
        name: "firstName",
        type: "string",
        default: "",
      },
      {
        displayName: "Forgotten Password Answer",
        name: "forgottenPasswordAnswer1",
        type: "string",
        typeOptions: { password: true },
        default: "",
      },
      {
        displayName: "Forgotten Password Question",
        name: "forgottenPasswordQuestion1",
        type: "string",
        typeOptions: { password: true },
        default: "",
      },
      {
        displayName: "Group ID",
        name: "groupId",
        type: "string",
        default: "",
      },
      {
        displayName: "Initials Image URI",
        name: "initialsImageUri",
        type: "string",
        default: "",
      },
      {
        displayName: "Is Admin",
        name: "isAdmin",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Job Title",
        name: "jobTitle",
        type: "string",
        default: "",
      },
      {
        displayName: "Last Name",
        name: "lastName",
        type: "string",
        default: "",
      },
      {
        displayName: "Login Status",
        name: "loginStatus",
        type: "options",
        default: "PasswordReset",
        options: [
          { name: "Active", value: "Active" },
          { name: "Password Reset", value: "PasswordReset" },
        ],
      },
      {
        displayName: "Middle Name",
        name: "middleName",
        type: "string",
        default: "",
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
      {
        displayName: "Profile Image URI",
        name: "profileImageUri",
        type: "string",
        default: "",
      },
      {
        displayName: "Send Activation Email",
        name: "sendActivationEmail",
        type: "boolean",
        default: true,
      },
      {
        displayName: "Send Activation On Invalid Login",
        name: "sendActivationOnInvalidLogin",
        type: "boolean",
        default: false,
      },
      {
        displayName: "Signature Image URI",
        name: "signatureImageUri",
        type: "string",
        default: "",
      },
      {
        displayName: "Suffix Name",
        name: "suffixName",
        type: "string",
        default: "",
      },
      {
        displayName: "Title",
        name: "title",
        type: "string",
        default: "",
      },
    ],
  },
  {
    displayName: "Work Address",
    name: "workAddress",
    type: "fixedCollection",
    default: {},
    placeholder: "Add Work Address",
    options: [
      {
        name: "address",
        displayName: "Address",
        values: [
          {
            displayName: "Address Line 1",
            name: "address1",
            type: "string",
            default: "",
          },
          {
            displayName: "Address Line 2",
            name: "address2",
            type: "string",
            default: "",
          },
          {
            displayName: "City",
            name: "city",
            type: "string",
            default: "",
          },
          {
            displayName: "State/Province",
            name: "stateOrProvince",
            type: "string",
            default: "",
          },
          {
            displayName: "Postal Code",
            name: "postalCode",
            type: "string",
            default: "",
          },
          {
            displayName: "Country",
            name: "country",
            type: "string",
            default: "",
          },
          {
            displayName: "Phone",
            name: "phone",
            type: "string",
            default: "",
          },
          {
            displayName: "Fax",
            name: "fax",
            type: "string",
            default: "",
          },
        ],
      },
    ],
  },
  {
    displayName: "Home Address",
    name: "homeAddress",
    type: "fixedCollection",
    default: {},
    placeholder: "Add Home Address",
    options: [
      {
        name: "address",
        displayName: "Address",
        values: [
          {
            displayName: "Address Line 1",
            name: "address1",
            type: "string",
            default: "",
          },
          {
            displayName: "Address Line 2",
            name: "address2",
            type: "string",
            default: "",
          },
          {
            displayName: "City",
            name: "city",
            type: "string",
            default: "",
          },
          {
            displayName: "State/Province",
            name: "stateOrProvince",
            type: "string",
            default: "",
          },
          {
            displayName: "Postal Code",
            name: "postalCode",
            type: "string",
            default: "",
          },
          {
            displayName: "Country",
            name: "country",
            type: "string",
            default: "",
          },
          {
            displayName: "Phone",
            name: "phone",
            type: "string",
            default: "",
          },
        ],
      },
    ],
  },
  {
    displayName: "User Settings",
    name: "userSettings",
    type: "fixedCollection",
    default: {},
    placeholder: "Add User Settings",
    options: [
      {
        name: "settings",
        displayName: "Settings",
        values: [
          {
            displayName: "Allow Bulk Sending",
            name: "allowBulkSend",
            type: "boolean",
            default: true,
          },
          {
            displayName: "Allow Recipient Language Selection",
            name: "allowRecipientLanguageSelection",
            type: "boolean",
            default: true,
          },
          {
            displayName: "Allow Send On Behalf Of",
            name: "allowSendOnBehalfOf",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Allow Signer Attachments",
            name: "allowSignerAttachments",
            type: "boolean",
            default: true,
          },
          {
            displayName: "API Account Wide Access",
            name: "apiAccountWideAccess",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Can Edit Shared Address Book",
            name: "canEditSharedAddressBook",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Can Manage Account",
            name: "canManageAccount",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Can Manage Templates",
            name: "canManageTemplates",
            type: "options",
            default: "use",
            options: [
              { name: "None", value: "none" },
              { name: "Use", value: "use" },
              { name: "Create", value: "create" },
              { name: "Share", value: "share" },
            ],
          },
          {
            displayName: "Can Send API Requests",
            name: "canSendAPIRequests",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Can Send Envelope",
            name: "canSendEnvelope",
            type: "boolean",
            default: true,
          },
          {
            displayName: "Enable DS Pro",
            name: "enableDSPro",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Enable Sequential Signing API",
            name: "enableSequentialSigningAPI",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Enable Sequential Signing UI",
            name: "enableSequentialSigningUI",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Enable Signer Attachments",
            name: "enableSignerAttachments",
            type: "boolean",
            default: true,
          },
          {
            displayName: "Enable Vaulting",
            name: "enableVaulting",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Locale",
            name: "locale",
            type: "options",
            default: "en",
            options: [
              { name: "Chinese (Simplified)", value: "zh_CN" },
              { name: "Chinese (Traditional)", value: "zh_TW" },
              { name: "English", value: "en" },
              { name: "French", value: "fr" },
              { name: "German", value: "de" },
              { name: "Italian", value: "it" },
              { name: "Japanese", value: "ja" },
              { name: "Korean", value: "ko" },
              { name: "Portuguese", value: "pt" },
              { name: "Portuguese (Brazil)", value: "pt_BR" },
              { name: "Russian", value: "ru" },
              { name: "Spanish", value: "es" },
            ],
          },
          {
            displayName: "Power Form Admin",
            name: "powerFormAdmin",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Power Form User",
            name: "powerFormUser",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Self Signed Recipient Email Document",
            name: "selfSignedRecipientEmailDocument",
            type: "options",
            default: "none",
            options: [
              { name: "None", value: "none" },
              { name: "PDF", value: "pdf" },
              { name: "PDF With Changes", value: "pdfwithchanges" },
            ],
          },
          {
            displayName: "Sender Can Edit Recipient Email Notifications",
            name: "senderCanEditRecipientEmailNotifications",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Sender Email Notifications",
            name: "senderEmailNotifications",
            type: "options",
            default: "all",
            options: [
              { name: "All", value: "all" },
              { name: "None", value: "none" },
              { name: "Failures Only", value: "failures_only" },
            ],
          },
          {
            displayName: "Timezone Offset Minutes",
            name: "timezoneOffsetMinutes",
            type: "number",
            default: 0,
          },
          {
            displayName: "Timezone DST Offset Minutes",
            name: "timezoneDSTOffsetMinutes",
            type: "number",
            default: 0,
          },
          {
            displayName: "Timezone Mask",
            name: "timezoneMask",
            type: "string",
            default: "",
          },
          {
            displayName: "Timezone Send To Timezones",
            name: "timezoneSendToTimezones",
            type: "boolean",
            default: false,
          },
          {
            displayName: "Vaulting Mode",
            name: "vaultingMode",
            type: "options",
            default: "none",
            options: [
              { name: "None", value: "none" },
              { name: "E Original", value: "eoriginal" },
            ],
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
  const email = this.getNodeParameter("email", index) as string;
  const userName = this.getNodeParameter("userName", index) as string;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as IDataObject;
  const workAddressData = this.getNodeParameter(
    "workAddress",
    index,
    {},
  ) as IDataObject;
  const homeAddressData = this.getNodeParameter(
    "homeAddress",
    index,
    {},
  ) as IDataObject;
  const userSettingsData = this.getNodeParameter(
    "userSettings",
    index,
    {},
  ) as IDataObject;

  const user: IDataObject = {
    email,
    userName,
  };

  const fields = [
    "firstName",
    "lastName",
    "middleName",
    "suffixName",
    "title",
    "jobTitle",
    "company",
    "countryCode",
    "permissionProfileId",
    "permissionProfileName",
    "sendActivationEmail",
    "sendActivationOnInvalidLogin",
    "activationAccessCode",
    "enableConnectForUser",
    "defaultAccountId",
    "groupId",
    "isAdmin",
    "loginStatus",
    "forgottenPasswordQuestion1",
    "forgottenPasswordAnswer1",
    "profileImageUri",
    "signatureImageUri",
    "initialsImageUri",
  ];

  fields.forEach((field) => {
    if (additionalFields[field] !== undefined) {
      user[field] = additionalFields[field];
    }
  });

  if (workAddressData.address && Array.isArray(workAddressData.address)) {
    const addressFields = workAddressData.address[0] as IDataObject;
    if (addressFields && Object.keys(addressFields).length > 0) {
      const workAddress: IDataObject = {};
      Object.entries(addressFields).forEach(([key, value]) => {
        if (value !== "" && value !== undefined && value !== null) {
          workAddress[key] = value;
        }
      });
      if (Object.keys(workAddress).length > 0) {
        user.workAddress = workAddress;
      }
    }
  }

  if (homeAddressData.address && Array.isArray(homeAddressData.address)) {
    const addressFields = homeAddressData.address[0] as IDataObject;
    if (addressFields && Object.keys(addressFields).length > 0) {
      const homeAddress: IDataObject = {};
      Object.entries(addressFields).forEach(([key, value]) => {
        if (value !== "" && value !== undefined && value !== null) {
          homeAddress[key] = value;
        }
      });
      if (Object.keys(homeAddress).length > 0) {
        user.homeAddress = homeAddress;
      }
    }
  }

  if (userSettingsData.settings && Array.isArray(userSettingsData.settings)) {
    const settingsFields = userSettingsData.settings[0] as IDataObject;
    if (settingsFields && Object.keys(settingsFields).length > 0) {
      const userSettings: IDataObject = {};
      Object.entries(settingsFields).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === "boolean") {
            userSettings[key] = value ? "true" : "false";
          } else if (typeof value === "number") {
            userSettings[key] = String(value);
          } else {
            userSettings[key] = value;
          }
        }
      });
      if (Object.keys(userSettings).length > 0) {
        user.userSettings = userSettings;
      }
    }
  }

  const body: IDataObject = {
    newUsers: [user],
  };

  const response = await docusignApiRequest.call(
    this,
    "POST",
    "/users",
    body,
  );

  return this.helpers.returnJsonArray(response.newUsers || []);
}
