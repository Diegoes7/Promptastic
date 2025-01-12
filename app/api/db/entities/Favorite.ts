import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity, JoinColumn, Column } from 'typeorm'
import { User } from './User'
import { Field, ID, ObjectType } from 'type-graphql'
import { Prompt } from './Prompt'

@ObjectType('Favorite')
@ObjectType()
@Entity({ name: "favorite" })
export class Favorite extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => ID)
  @Column()
  userId!: number

  @Field(() => ID)
  @Column()
  promptId!: number

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.favorites, { lazy: true })
  @JoinColumn({ name: "userId" })
  user!: Promise<User>

  @Field(() => Prompt, { nullable: true })
  @ManyToOne(() => Prompt, { nullable: true, lazy: true })
  prompt?: Promise<Prompt>

  // @Field(() => Prompt, { nullable: true })
  // @ManyToOne(() => Prompt, (prompt) => prompt.favorites, { onDelete: 'CASCADE', lazy: true })
  // @JoinColumn({ name: "promptId" })
  // prompt!: Promise<Prompt>
}
