import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
