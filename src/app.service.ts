import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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

    return await this.userRepository.find();
  }
}
