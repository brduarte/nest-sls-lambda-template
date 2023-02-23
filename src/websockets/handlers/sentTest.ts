import AWS from 'aws-sdk';
import { BSON } from 'bson';
import { createClient } from 'redis';

export async function SendTest() {
  const callbackUrl = `http://localhost:3001`;
  const client = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: callbackUrl,
  });

  const redis = createClient({
    database: 1,
    password: 'yourpassword',
  });

  redis.on('error', (err) => console.log('Redis Client Error', err));
  await redis.connect();

  const requestParams = {
    ConnectionId: await redis.get('1'),
    Data: JSON.stringify({
      teste: 'teste',
    }),
  };

  try {
    await client.postToConnection(requestParams).promise();
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      teste: `send to, ${await redis.get('1')}`,
    }),
  };
}
