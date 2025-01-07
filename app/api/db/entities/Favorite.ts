import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity, JoinColumn } from 'typeorm'
import { User } from './User'
import { Prompt } from './Prompt'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType('Favorite')
@Entity({ name: "favorite" })
export class Favorite extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.favorites, { lazy: true })
  @JoinColumn({ name: "userId" })
  user!: Promise<User>

  @Field(() => Prompt)
  @ManyToOne(() => Prompt, (prompt) => prompt.favorites, { lazy: true })
  @JoinColumn({ name: "promptId" })
  prompt!: Promise<Prompt>
}
