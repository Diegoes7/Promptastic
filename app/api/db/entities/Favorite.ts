import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity, JoinColumn, PrimaryColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { Prompt } from './Prompt'
import { User } from './User'

@ObjectType('Favorite')
@Entity({ name: "favorite" })
export class Favorite extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => ID)
  @PrimaryColumn()
  userId!: number

  @Field(() => ID)
  @PrimaryColumn()
  promptId!: number

  // @Field(() => User, { nullable: true })
  // @ManyToOne(() => User, { lazy: true })
  // @JoinColumn({ name: "userId" })
  // user!: Promise<User>

  @Field(() => Prompt, { nullable: true })
  @ManyToOne(() => Prompt, { onDelete: 'CASCADE', nullable: true, lazy: true })
  @JoinColumn({ name: "promptId" })
  prompt?: Promise<Prompt>

  // @Field(() => Prompt, { nullable: true })
  // @ManyToOne(() => Prompt, (prompt) => prompt.favorites, { onDelete: 'CASCADE', lazy: true })
  // @JoinColumn({ name: "promptId" })
  // prompt!: Promise<Prompt>
}
