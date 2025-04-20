import { Field } from "@nestjs/graphql";
import { UserModel } from "src/user/user.entity";
import { Column } from "typeorm";


export class BaseEntity {

  @Field()
  @Column()
  createdAt: Date;
  
  @Field()
  @Column({ type: "nvarchar", nullable: true, default: null })
  createdBy: string;

  @Field()
  @Column({ nullable: true, default: null })
  updatedAt: Date;

  @Field()
  @Column({ nullable: true, default: null })
  deletedAt: Date;

}