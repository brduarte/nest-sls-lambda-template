import { ConnectionHandler } from './handlers/websockets/connection.handler';
import { DefaultHandles } from './handlers/websockets/default.handles';
import { bootstrap } from './handlers/http/bootstrap.handler';
import process from 'process';

export const handlers = {
  http: {
    bootstrap: bootstrap,
  },
  ws: {
    connection: ConnectionHandler,
    default: DefaultHandles,
  },
};

if (process.env.RUN_MODE !== 'serverless') {
  handlers.http.bootstrap();
}
