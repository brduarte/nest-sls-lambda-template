import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { Image } from './image.entity';

@Entity()
export class Location {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  title: string;

  @Column((type) => Image)
  images: Image[];
}
