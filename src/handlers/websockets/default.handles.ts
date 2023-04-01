import AWS from 'aws-sdk';

export async function DefaultHandles(event) {
  console.log(event.body);
  const connectionId = event.requestContext.connectionId;
  const client = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: process.env.WS_SEND_EVENT_URL,
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
