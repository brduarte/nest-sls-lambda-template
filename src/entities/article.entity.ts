import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { Location } from './location.entity';

@Entity()
export class Article {
  @ObjectIdColumn({ name: '_id' })
  id?: ObjectID;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column((type) => Location)
  locations: Location;

  @Column()
  type: string;

  @Column()
  banner: string;

  @CreateDateColumn()
  createAt: Date;
}
