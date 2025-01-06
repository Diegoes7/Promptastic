import 'reflect-metadata'
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User'
import { Favorite } from './Favorite'
import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType('Prompt')
@Entity({ name: "prompt" })
export class Prompt extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column({ unique: true })
  prompt!: string

  @Field(() => String)
  @Column({ unique: true })
  title!: string

  @Field(() => String)
  @Column({ unique: true })
  tag!: string

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  likes!: number

  @Field()
  @CreateDateColumn()
  createdAt!: Date

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date

  @Field(() => User, { nullable: true }) //? Mark the field as nullable
  @ManyToOne(() => User, (user) => user.prompts, { nullable: true })
  creator: User | null = null;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  creatorId!: number

  @Field(() => [Favorite])
  @OneToMany(() => Favorite, (favorite) => favorite.prompt)
  favorites!: Favorite[]
}
