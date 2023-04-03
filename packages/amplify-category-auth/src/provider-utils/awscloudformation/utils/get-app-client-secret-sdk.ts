import { $TSContext } from '@aws-amplify/amplify-cli-core';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

export const getAppClientSecretViaSdk = async (context: $TSContext, userpoolId: string, clientId: string): Promise<string | undefined> => {
  const identity = await getCognitoIdentityProviderClient(context);
  const params = {
    ClientId: clientId,
    UserPoolId: userpoolId,
  };
  const result = await identity.describeUserPoolClient(params).promise();
  return result.UserPoolClient?.ClientSecret;
};

const getCognitoIdentityProviderClient = async (context: $TSContext): Promise<CognitoIdentityServiceProvider> => {
  const { client } = await context.amplify.invokePluginMethod<{ client: CognitoIdentityServiceProvider }>(
    context,
    'awscloudformation',
    undefined,
    'getConfiguredCognitoIdentityProviderClient',
    [context],
  );
  return client;
};
