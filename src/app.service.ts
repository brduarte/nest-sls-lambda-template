import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseClientService } from './commons/providers/openai/services/base-client.service';
import { TextService } from './commons/providers/openai/services/text.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private textService: TextService,
  ) {}
  async getHello() {
    await this.userRepository.insert({
      firstName: 'Bruno',
      lastName: 'Maciej Duarte',
      profile: {
        about: 'Technological',
        career: 'Tech',
        education: 'Superior',
      },
    });

    return this.textService.completion();
  }
}
