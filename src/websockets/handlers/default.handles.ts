import AWS from 'aws-sdk';

import { BSON } from 'bson';

export async function DefaultHandles(event) {
  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const connectionId = event.requestContext.connectionId;
  const callbackUrl = `http://${domain}:3001`;
  const client = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: callbackUrl,
  });

  const requestParams = {
    ConnectionId: connectionId,
    Data: JSON.stringify({
      connected: 'true',
    }),
  };

  try {
    await client.postToConnection(requestParams).promise();
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
  };
}
