import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Thumbnail {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  url: string;

  @Column()
  height: number;

  @Column()
  width: number;
}
