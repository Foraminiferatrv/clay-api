import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User, UserResponse } from "../models/User";
import { CreateUserInput } from "../inputs/CreateUserInput";
import { PrismaService } from "prisma/prisma.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/common/guards/auth.guard";

@Resolver()
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserResponse], { nullable: true })
  async getAllUsers() {
    const res = await this.prisma.user.findMany();
    return res;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserResponse, { nullable: true })
  async getUserById(@Args("id") id: string) {
    return await this.prisma.user.findUnique({ where: { id: id } });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async createUser(@Args("createUserData") data: CreateUserInput) {
    return this.prisma.user.create({ data });
  }
}
