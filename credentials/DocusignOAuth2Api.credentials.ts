import {
  IAuthenticateGeneric,
  Icon,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from "n8n-workflow";

export class DocusignOAuth2Api implements ICredentialType {
  name = "docusignOAuth2Api";
  extends = ["oAuth2Api"];
  displayName = "Docusign OAuth2 API";
  documentationUrl = "https://developers.docusign.com/";
  icon: Icon = "file:../icons/docusign.svg";
  properties: INodeProperties[] = [
    {
      displayName: "Authorization URL",
      name: "authUrl",
      type: "hidden",
      default: '={{$self["server"]}}/oauth/auth',
    },
    {
      displayName: "Access Token URL",
      name: "accessTokenUrl",
      type: "hidden",
      default: '={{$self["server"]}}/oauth/token',
    },
    {
      displayName: "Metadata",
      name: "metadataUrl",
      type: "hidden",
      default: '={{$self["server"]}}/oauth/userinfo',
      required: true,
    },
    {
      displayName: "Scope",
      name: "scope",
      type: "string",
      default: "impersonation extended signature",
    },
    {
      displayName: "Auth URI Query Parameters",
      name: "authQueryParameters",
      type: "hidden",
      default: "",
    },
    {
      displayName: "Authentication",
      name: "authentication",
      type: "hidden",
      default: "header",
    },
    {
      displayName: "Environment",
      name: "server",
      type: "options",
      options: [
        {
          name: "Development",
          value: "https://account-d.docusign.com",
        },
        {
          name: "Production",
          value: "https://account.docusign.com",
        },
      ],
      default: "https://account.docusign.com",
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: "generic",
    properties: {
      headers: {
        Authorization: "=Bearer {{$credentials.accessToken}}",
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: "={{$credentials.server}}",
      url: "/oauth/userinfo",
      method: "GET",
    },
  };
}
