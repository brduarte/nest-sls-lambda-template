import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { Image } from './image.entity';

@Entity()
export class Location {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  type: string;

  @Column((type) => Image)
  images: Image[];
}
