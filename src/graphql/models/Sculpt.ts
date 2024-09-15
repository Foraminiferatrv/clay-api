import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./User";

@ObjectType()
export class Sculpt {
  @Field()
  id: string;

  @Field()
  fileId: string;

  @Field()
  name: string;

  @Field()
  author: User;
}
