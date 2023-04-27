import { Controller, Get } from '@nestjs/common';

import { BotService } from './services/bot.service';

@Controller('bot')
export class BotController {
  constructor(private botService: BotService) {}
  @Get('/')
  async location() {
    return this.botService.writeArticle();
  }
}
