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
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column((type) => Location)
  locations: Location;

  type: string;

  @Column()
  banner: string;

  @CreateDateColumn()
  createAt: Date;
}
