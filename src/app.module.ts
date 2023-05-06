import { Module } from '@nestjs/common';
import { SearchModule } from './modules/search/search.module';
import { BotModule } from './modules/bot/bot.module';
import { ArticleModule } from './modules/article/article.module';

@Module({
  imports: [SearchModule, BotModule, ArticleModule],
})
export class AppModule {}
