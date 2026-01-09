import {
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
  ILoadOptionsFunctions,
  IRequestOptions,
  NodeApiError,
} from "n8n-workflow";

import { getMetadata, selectAccount } from "@utils/accountSelection";

export async function docusignApiRequest(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  method: string,
  endpoint: string,
  body: object,
  query?: IDataObject,
  option: IDataObject = {},
): Promise<any> {
  const options: IRequestOptions = {
    method: method as IHttpRequestMethods,
    headers: {
      "User-Agent": "n8n",
    },
    body,
    qs: query,
    url: "",
    json: true,
  };

  if (Object.keys(option).length !== 0) {
    Object.assign(options, option);
  }

  try {
    const credentials = await this.getCredentials("docusignOAuth2Api");

    options.headers!.Authorization = `Bearer ${credentials.accessToken}`;

    const { accounts } = await getMetadata.call(
      this,
      credentials.oauthTokenData as IDataObject,
    );

    const account = await selectAccount.call(this, accounts);

    const baseUrl =
      `${account.base_uri}/restapi/v2.1/accounts/${account.account_id}`;
    options.url = `${baseUrl}${endpoint}`;

    return await this.helpers.requestOAuth2!.call(
      this,
      "docusignOAuth2Api",
      options,
    );
  } catch (error) {
    throw new NodeApiError(this.getNode(), error);
  }
}

export async function docusignApiRequestAllItems(
  this: IHookFunctions | IExecuteFunctions,
  method: string,
  endpoint: string,
  body: any = {},
  query: IDataObject = {},
): Promise<any> {
  const returnData: IDataObject[] = [];

  let responseData;

  query.per_page = 100;
  query.page = 1;

  do {
    responseData = await docusignApiRequest.call(
      this,
      method,
      endpoint,
      body,
      query,
      { resolveWithFullResponse: true },
    );
    query.page++;
    returnData.push.apply(returnData, responseData.body);
  } while (
    responseData.headers.link && responseData.headers.link.includes("next")
  );
  return returnData;
}
