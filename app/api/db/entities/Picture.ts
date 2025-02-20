import { Field, ID, ObjectType, Int } from 'type-graphql'
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'

@ObjectType('Picture')
@Entity({ name: "picture" })
export class Picture extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column()
  filename!: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  mimetype!: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  path!: string

  @Field(() => Int)
  @Column()
  creatorId!: number

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.picture, { lazy: true })
  user!: Promise<User>  // Add the relationship with User
}
