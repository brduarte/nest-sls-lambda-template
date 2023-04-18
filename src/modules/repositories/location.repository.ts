import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Location } from '../../entities/location.entity';

@Injectable()
export class LocationRepository extends Repository<Location> {
  constructor(private dataSource: DataSource) {
    super(Location, dataSource.createEntityManager());
  }

  async findByTitle(title: string): Promise<Location> {
    return await this.findOne({
      where: {
        title,
      },
    });
  }
}
