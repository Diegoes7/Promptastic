import { Field, ID, ObjectType } from "type-graphql"
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { type Relation } from 'typeorm'
import { Prompt } from "./Prompt"
import { Picture } from "./Picture"

@ObjectType('User')  // Unique name for GraphQL schema
@Entity({ name: "user" })
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field({ nullable: true }) // Exposes the sub field to the GraphQL schema
  @Column({ unique: true, nullable: true })
  sub!: string // Store the sub field as a string

  @Field(() => String,)
  @Column({ nullable: true })
  username!: string

  @Field(() => String)
  @Column()
  email!: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  password!: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  picture?: string

  @Field()
  @CreateDateColumn()
  createdAt!: Date

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date

  @Field(() => ID)
  @Column({ nullable: true })
  promptId!: number

  @Field(() => Prompt, { nullable: true })
  @OneToMany(() => Prompt, prompt => prompt.creator, { lazy: true })
  prompts!: Promise<Prompt[]>

  @Field(() => Picture, { nullable: true })
  @OneToMany(() => Picture, (picture) => picture)
  image!: Picture
}



