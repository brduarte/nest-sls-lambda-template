import { InitServiceByModuleUtil } from '../../Utils/init-service-by-module';
import { BotModule } from '../../modules/bot/bot.module';
import { BotService } from '../../modules/bot/services/bot.service';

export async function CreateArticleSchedule(): Promise<void> {
  const botService: BotService = await InitServiceByModuleUtil.execute(
    BotModule,
    BotService,
  );

  botService.writeArticle();
}
