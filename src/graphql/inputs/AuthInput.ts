import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SignUpInput {
  @Field({ nullable: true })
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LogInInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
