import { API_ENDPOINTS } from "@utils/constants";

export function buildEnvelopeEndpoint(
  envelopeId?: string,
  subPath?: string,
): string {
  let endpoint = API_ENDPOINTS.ENVELOPES;
  if (envelopeId) {
    endpoint += `/${envelopeId}`;
    if (subPath) {
      endpoint += `/${subPath}`;
    }
  }
  return endpoint;
}

export function buildTemplateEndpoint(
  templateId?: string,
  subPath?: string,
): string {
  let endpoint = API_ENDPOINTS.TEMPLATES;
  if (templateId) {
    endpoint += `/${templateId}`;
    if (subPath) {
      endpoint += `/${subPath}`;
    }
  }
  return endpoint;
}

export function buildUserEndpoint(userId?: string, subPath?: string): string {
  let endpoint = API_ENDPOINTS.USERS;
  if (userId) {
    endpoint += `/${userId}`;
    if (subPath) {
      endpoint += `/${subPath}`;
    }
  }
  return endpoint;
}

export function buildGroupEndpoint(groupId?: string, subPath?: string): string {
  let endpoint = API_ENDPOINTS.GROUPS;
  if (groupId) {
    endpoint += `/${groupId}`;
    if (subPath) {
      endpoint += `/${subPath}`;
    }
  }
  return endpoint;
}

export function buildFolderEndpoint(
  folderId?: string,
  subPath?: string,
): string {
  let endpoint = API_ENDPOINTS.FOLDERS;
  if (folderId) {
    endpoint += `/${folderId}`;
    if (subPath) {
      endpoint += `/${subPath}`;
    }
  }
  return endpoint;
}

export function buildWorkspaceEndpoint(
  workspaceId?: string,
  subPath?: string,
): string {
  let endpoint = API_ENDPOINTS.WORKSPACES;
  if (workspaceId) {
    endpoint += `/${workspaceId}`;
    if (subPath) {
      endpoint += `/${subPath}`;
    }
  }
  return endpoint;
}

export function buildPowerFormEndpoint(
  powerFormId?: string,
  subPath?: string,
): string {
  let endpoint = API_ENDPOINTS.POWER_FORMS;
  if (powerFormId) {
    endpoint += `/${powerFormId}`;
    if (subPath) {
      endpoint += `/${subPath}`;
    }
  }
  return endpoint;
}

export function buildPermissionProfileEndpoint(
  permissionProfileId?: string,
  subPath?: string,
): string {
  let endpoint = API_ENDPOINTS.PERMISSION_PROFILES;
  if (permissionProfileId) {
    endpoint += `/${permissionProfileId}`;
    if (subPath) {
      endpoint += `/${subPath}`;
    }
  }
  return endpoint;
}

export function buildSigningGroupEndpoint(
  signingGroupId?: string,
  subPath?: string,
): string {
  let endpoint = API_ENDPOINTS.SIGNING_GROUPS;
  if (signingGroupId) {
    endpoint += `/${signingGroupId}`;
    if (subPath) {
      endpoint += `/${subPath}`;
    }
  }
  return endpoint;
}

export function buildCloudStorageEndpoint(
  cloudStorageId?: string,
  subPath?: string,
): string {
  let endpoint = API_ENDPOINTS.CLOUD_STORAGE;
  if (cloudStorageId) {
    endpoint += `/${cloudStorageId}`;
    if (subPath) {
      endpoint += `/${subPath}`;
    }
  }
  return endpoint;
}

export function buildCustomTabEndpoint(customTabId?: string): string {
  let endpoint = API_ENDPOINTS.CUSTOM_TABS;
  if (customTabId) {
    endpoint += `/${customTabId}`;
  }
  return endpoint;
}

export function buildConnectEndpoint(connectId?: string): string {
  let endpoint = API_ENDPOINTS.CONNECT;
  if (connectId) {
    endpoint += `/${connectId}`;
  }
  return endpoint;
}

export function buildResourceEndpoint(
  baseEndpoint: string,
  resourceId?: string,
  subPath?: string,
): string {
  let endpoint = baseEndpoint;
  if (resourceId) {
    endpoint += `/${resourceId}`;
    if (subPath) {
      endpoint += `/${subPath}`;
    }
  }
  return endpoint;
}
