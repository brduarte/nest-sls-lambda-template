import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'bson';

export class Profile {
  @Column()
  about: string;

  @Column()
  education: string;

  @Column()
  career: string;
}

@Entity('user')
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column((type) => Profile)
  profile: Profile;
}
