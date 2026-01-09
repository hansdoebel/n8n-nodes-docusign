import {
  IDataObject,
  IExecuteFunctions,
  IExecuteSingleFunctions,
  IHookFunctions,
  ILoadOptionsFunctions,
  IRequestOptions,
  NodeApiError,
  NodeOperationError,
} from "n8n-workflow";

import { DSAccount, DSMetadataObject } from "../types";

export async function getMetadata(
  this:
    | IHookFunctions
    | IExecuteFunctions
    | IExecuteSingleFunctions
    | ILoadOptionsFunctions,
  oauthTokenData: IDataObject,
): Promise<DSMetadataObject> {
  const credentials = await this.getCredentials("docusignOAuth2Api");

  const options: IRequestOptions = {
    method: "GET",
    headers: {
      "User-Agent": "n8n",
      "Authorization": `Bearer ${credentials.accessToken}`,
    },
    url: credentials.metadataUrl as string,
    json: true,
  };

  return await this.helpers.requestOAuth2!.call(
    this,
    "docusignOAuth2Api",
    options,
  );
}

export async function selectAccount(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  accounts: DSAccount[],
): Promise<DSAccount> {
  if (accounts.length <= 0) {
    throw new NodeApiError(this.getNode(), {
      message: "No accounts found in connected Docusign User",
    });
  }

  let account: DSAccount | undefined = undefined;

  const useDefaultAccount = this.getNodeParameter(
    "useDefaultAccount",
    0,
  ) as boolean;

  if (useDefaultAccount) {
    account = accounts.find((account) => account.is_default);
  }

  if (!account) {
    const useAccountId = this.getNodeParameter("accountId", 0) as string;
    if (useAccountId) {
      account = accounts.find((account) => account.account_id === useAccountId);
    }

    if (!account) {
      account = accounts[0];
    }
  }

  if (!account) {
    throw new NodeOperationError(
      this.getNode(),
      `Could not select Docusign Account to use!`,
    );
  }

  return account;
}
