import { Callback, Context } from 'aws-lambda';
import { createClient } from 'redis';

export async function SumarryHandles(
  event: any,
  context: Context,
  callback: Callback,
) {
  const body = JSON.parse(event.body);
  const client = createClient({
    database: 1,
    password: 'yourpassword',
  });

  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
  await client.set('1', event.requestContext.connectionId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      teste: `Hello, ${await client.get('1')}`,
    }),
  };
}
