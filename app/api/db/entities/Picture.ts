import { Field, ID, ObjectType, Int } from 'type-graphql'
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'

@ObjectType()
@Entity()
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
  userId!: number

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.picture)
  user!: Promise<User>  // Add the relationship with User
}
