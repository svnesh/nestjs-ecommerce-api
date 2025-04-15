import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "src/common/base.entity";
import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";


@ObjectType()
@Entity()
export class UserModel extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type:'text', nullable: true })
  hashedRefreshToken?: string | null;
  
}
