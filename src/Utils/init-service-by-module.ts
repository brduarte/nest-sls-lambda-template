import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

export class InitServiceByModuleUtil {
  static async execute(module: any, service: any): Promise<any> {
    const moduleInstance: INestApplication = await NestFactory.create(module);
    await moduleInstance.init();

    return moduleInstance.get(service);
  }
}
