import { Module } from '@nestjs/common';
import { SearchModule } from './modules/search/search.module';
import { BotModule } from './modules/bot/bot.module';

@Module({
  imports: [SearchModule, BotModule],
})
export class AppModule {}
