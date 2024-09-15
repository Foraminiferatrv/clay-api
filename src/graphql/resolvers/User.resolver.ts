import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "../models/User";
import { CreateUserInput } from "../utils/CreateUserInput";
import { PrismaService } from "prisma/prisma.service";

@Resolver()
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => User, { nullable: true })
  getUserById(@Args("id") id: string) {
    return {
      id: "test",
      email: "test@mail.com",
      sculpts: []
    };
  }

  @Mutation(() => User)
  createUser(@Args("createUserData") data: CreateUserInput) {
    console.log("CREATE");
    return this.prisma.user.create({ data });
  }
}
