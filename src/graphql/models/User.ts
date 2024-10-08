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

@ObjectType()
export class UserResponse {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;
}
