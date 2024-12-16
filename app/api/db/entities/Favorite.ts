import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './User';
import { Prompt } from './Prompt';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Favorite extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.favorites)
  user!: Promise<User>;

  @Field(() => Prompt)
  @ManyToOne(() => Prompt, (prompt) => prompt.favorites)
  prompt!: Promise<Prompt>;
}
