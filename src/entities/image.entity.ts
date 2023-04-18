import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Thumbnail } from './thumbnail.entity';

@Entity()
export class Image {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column((type) => Thumbnail)
  thumbnail: Thumbnail;
}
