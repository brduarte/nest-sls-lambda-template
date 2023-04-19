import { Injectable } from '@nestjs/common';
import { DataSource, MongoRepository } from 'typeorm';
import { Location } from '../../../entities/location.entity';
import { PluralizeUtil } from '../../../Utils/Pluralize.util';

@Injectable()
export class LocationRepository extends MongoRepository<Location> {
  constructor(private dataSource: DataSource) {
    super(Location, dataSource.createEntityManager());
  }

  async findOneNameByType(name: string, type: string): Promise<Location> {
    return await this.findOne({
      where: {
        name,
        type,
      },
    });
  }

  async findByCountryAndType(
    place: string,
    type: string,
    limit = 10,
  ): Promise<Location[]> {
    return this.find({
      where: {
        country: place,
        type: {
          $in: [PluralizeUtil.singularize(type), PluralizeUtil.pluralize(type)],
        },
      },
      take: limit,
    });
  }
}
