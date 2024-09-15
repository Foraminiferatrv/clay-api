import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { hashPassword } from "src/utils/hash-password";
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Req
} from "@nestjs/common";
import { SignUpInput } from "../inputs/AuthInput";
import { User } from "../models/User";
import { PrismaService } from "prisma/prisma.service";

@Resolver()
export class AuthResolver {
  //auth service
  constructor(private prisma: PrismaService) {}

  @Mutation(() => User)
  async signUp(@Args("signUpInput") signUpInput: SignUpInput) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: signUpInput.email }
    });

    if (existingUser) {
      throw new ConflictException("User already exists");
    }

    const hashedPassword = await hashPassword(signUpInput.password);

    if (!signUpInput.name)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "User name is missing"
        },
        HttpStatus.BAD_REQUEST
      );

    if (hashedPassword) {
      return this.prisma.user.create({
        data: {
          password: hashedPassword,
          name: signUpInput.name,
          email: signUpInput.email
        }
      });
    }
  }
}
