import { Field } from "@nestjs/graphql";
import { Column } from "typeorm";


export class BaseEntity {

  @Field()
  @Column()
  createdAt: Date;

  @Field()
  @Column({ nullable: true, default: null })
  updatedAt: Date;

  @Field()
  @Column({ nullable: true, default: null })
  deletedAt: Date;

}