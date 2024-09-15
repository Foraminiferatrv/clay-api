import { Field, ObjectType } from "@nestjs/graphql";
import { Sculpt } from "./Sculpt";

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  password: string;

  // @Field()
  // sculpts: [Sculpt];
}
