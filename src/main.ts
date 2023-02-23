import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConnectionHandler } from './websockets/handlers/connection.handler';
import { SumarryHandles } from './websockets/handlers/sumarry.handles';
import { DefaultHandles } from './websockets/handlers/default.handles';
import { SendTest } from './websockets/handlers/sentTest';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handlers = {
  http: async (event: any, context: Context, callback: Callback) => {
    server = server ?? (await bootstrap());
    return server(event, context, callback);
  },
  ws: {
    connection: ConnectionHandler,
    summary: SumarryHandles,
    default: DefaultHandles,
    send: SendTest,
  },
};
