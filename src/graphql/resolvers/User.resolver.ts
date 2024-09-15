import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User, UserResponse } from "../models/User";
import { CreateUserInput } from "../inputs/CreateUserInput";
import { PrismaService } from "prisma/prisma.service";

@Resolver()
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => UserResponse)
  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  @Query(() => UserResponse, { nullable: true })
  async getUserById(@Args("id") id: string) {
    return await this.prisma.user.findUnique({ where: { id: id } });
  }

  @Mutation(() => User)
  async createUser(@Args("createUserData") data: CreateUserInput) {
    return this.prisma.user.create({ data });
  }
}
