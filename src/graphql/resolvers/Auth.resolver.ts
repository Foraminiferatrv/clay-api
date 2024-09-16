import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { hashPassword } from "src/utils/hash-password";
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Req
} from "@nestjs/common";
import { LogInInput, SignUpInput } from "../inputs/AuthInput";
import { LoginResponse, User } from "../models/User";
import { PrismaService } from "prisma/prisma.service";
import { AuthService } from "src/services/auth.service";
import { JwtService } from "@nestjs/jwt";

@Resolver()
export class AuthResolver {
  //auth service
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

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

    if (!hashedPassword) return null;

    const newUser = await this.prisma.user.create({
      data: {
        password: hashedPassword,
        name: signUpInput.name,
        email: signUpInput.email
      }
    });

    const payload = { userId: newUser.id, email: newUser.email };

    const token = await this.jwtService.signAsync(payload);

    return newUser;
  }

  @Query(() => LoginResponse)
  async logIn(@Args("logInInput") logInInput: LogInInput) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: logInInput.email }
    });

    const { access_token } = await this.authService.logIn(
      existingUser.email,
      logInInput.password
    );

    return { access_token };
  }
}
