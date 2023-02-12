import { ConfigModule } from '@nestjs/config';
import configService from './config.service';

export default ConfigModule.forRoot({
  load: [configService],
});
