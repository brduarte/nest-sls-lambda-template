import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import ConfigModule from '../config/config.module';
import { ConfigService } from '@nestjs/config';

export default TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  // Use useFactory, useClass, or useExisting
  // to configure the DataSourceOptions.
  useFactory: (configService: ConfigService) => ({
    type: 'mongodb',
    host: configService.get('database.host'),
    port: +configService.get('database.port'),
    username: configService.get('database.username'),
    password: encodeURIComponent(configService.get('database.password')),
    database: configService.get('database.database'),
    logging: true,
    autoLoadEntities: true,
  }),
  // dataSource receives the configured DataSourceOptions
  // and returns a Promise<DataSource>.
  dataSourceFactory: async (options) => {
    return await new DataSource(options).initialize();
  },
});
