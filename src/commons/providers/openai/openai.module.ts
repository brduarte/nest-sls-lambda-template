import ConfigModule from '../../config/config.module';
import { Module } from '@nestjs/common';
import { TextService } from './services/text.service';

@Module({
  imports: [ConfigModule],
  providers: [TextService],
  exports: [TextService],
})
export class OpenaiModule {}
