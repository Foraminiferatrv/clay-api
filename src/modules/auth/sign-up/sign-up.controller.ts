import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post
} from "@nestjs/common";

import { SignUpService } from "./sign-up.service";
import { TUser, TUserData } from "src/models/user.model";

@Controller()
export class SignUpController {
  constructor(private signUpService: SignUpService) {}

  @Post("sign-up")
  async signUp(@Body() userData: TUserData): Promise<TUser> {
    if (!userData.name)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "User name is missing"
        },
        HttpStatus.BAD_REQUEST
      );

    return await this.signUpService.createNewUser(userData);
  }
}
