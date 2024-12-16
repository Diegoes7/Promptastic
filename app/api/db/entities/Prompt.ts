import 'reflect-metadata'
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User'
import { Field, ID, Int, ObjectType } from 'type-graphql'
import { Favorite } from './Favorite'

@ObjectType()
@Entity()
export class Prompt extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ unique: true })
  prompt!: string

  @Field()
  @Column({ unique: true })
  title!: string

  @Field()
  @Column({ unique: true })
  tag!: string

  @Field(() => Int)
  @Column({ type: 'int', nullable: true })
  likes!: number

  @Field()
  @CreateDateColumn()
  createdAt!: Date

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date

  @Field(() => User, { nullable: true }) //! Mark the field as nullable
  @ManyToOne(() => User, (user) => user.prompts, { nullable: true })
  creator: User | null = null;

  @Field({ nullable: true })
  @Column({ nullable: true })
  creatorId!: number

  @Field(() => [Favorite])
  @OneToMany(() => Favorite, (favorite) => favorite.prompt)
  favorites!: Promise<Favorite[]>
}
