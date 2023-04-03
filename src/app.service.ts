import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TextService } from './commons/providers/openai/services/text.service';
import { CustomSearchService } from './commons/providers/google/services/custom-search.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private textService: TextService,
    private customSearchService: CustomSearchService,
  ) {}
  async getHello() {
    const { choices } = await this.textService.completion();

    return this.customSearchService.searchImage('Mini Mundo');
  }
}
