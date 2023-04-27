import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Article {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  content: string;

  @Column((type) => Location)
  locations: Location[];

  @Column()
  image: string;
}
