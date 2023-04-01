import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import serverlessExpress from '@vendia/serverless-express';
import * as process from 'process';
import { INestApplication } from '@nestjs/common';

export async function bootstrap(event?, context?, callback?): Promise<any> {
  const app: INestApplication = await NestFactory.create(AppModule);

  //Adiciona o prefix /v1 em todas as rotas
  app.setGlobalPrefix('v1');

  await app.init();
  if (process.env.RUN_MODE === 'serverless') {
    return await startWithServerless(app, { event, context, callback });
  } else {
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Server Started in port http://localhost:${port} 🚀`);
  }
}

async function startWithServerless(app: INestApplication, awsEvent: any) {
  const expressApp = app.getHttpAdapter().getInstance();

  const server = serverlessExpress({ app: expressApp });

  return server(awsEvent.event, awsEvent.context, awsEvent.callback);
}
