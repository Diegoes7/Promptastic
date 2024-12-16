import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './User' // Adjust this path based on your project structure

@ObjectType()
@Entity()
export class Picture extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  filename!: string

  @Field()
  @Column()
  mimetype!: string

  @Field()
  @Column()
  path!: string

  // @Field(() => User)
  // @ManyToOne(() => User, (user) => user.picture, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'userId' })
  // user!: Promise<User>

  @Field()
  @Column()
  userId!: number
}
