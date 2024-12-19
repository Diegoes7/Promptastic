import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

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

  @Field()
  @Column()
  userId!: number
}
