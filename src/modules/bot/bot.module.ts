import { Module } from '@nestjs/common';
import { OpenaiModule } from '../../commons/providers/openai/openai.module';
import { BotController } from './bot.controller';
import { BotService } from './services/bot.service';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [OpenaiModule, SearchModule],
  providers: [BotService],
  controllers: [BotController],
})
export class BotModule {}
