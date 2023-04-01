import { Callback, Context } from 'aws-lambda';

export function ConnectionHandler(
  event: any,
  context: Context,
  callback: Callback,
) {
  event = JSON.stringify(event || {});

  if (event.eventType === 'CONNECT') {
    callback(null, {
      statusCode: 200,
      body: 'Connected.',
    });
  } else {
    callback(null, {
      statusCode: 200,
      body: 'Disconnected.',
    });
  }
}
