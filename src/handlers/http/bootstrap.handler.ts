import { Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import serverlessExpress from '@vendia/serverless-express';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as process from 'process';

export async function bootstrap(event?, context?, callback?): Promise<any> {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  //Adiciona o prefix /v1 em todas as rotas
  app.setGlobalPrefix('v1');

  await app.init();
  if (process.env.RUN_MODE === 'serverless') {
    return await startWithServerless(app, { event, context, callback });
  } else {
    await app.listen(process.env.PORT || 3000);
  }
}

async function startWithServerless(app: INestApplication, awsEvent: any) {
  const expressApp = app.getHttpAdapter().getInstance();

  const server = serverlessExpress({ app: expressApp });

  return server(awsEvent.event, awsEvent.context, awsEvent.callback);
}
