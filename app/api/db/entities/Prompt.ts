import 'reflect-metadata'
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm'
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

  @Field(() => User, { nullable: true }) //* Mark the field as nullable
  @ManyToOne(() => User, (creator) => creator.prompts, { lazy: true })
  creator!: Promise<User>

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  creatorId!: number

  @Field(() => [Favorite], { nullable: true })
  @OneToMany(() => Favorite, (favorite) => favorite.prompt, { cascade: ['remove'], onDelete: 'CASCADE', lazy: true })
  favorites!: Promise<Favorite[]>
}
