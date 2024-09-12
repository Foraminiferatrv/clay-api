import { Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";

@Controller("sign-in")
export class SignInController {
  @Post()
  signIn(@Req() request: Request) {
    return { user: { id: "welfjwepflo" } };
  }
}
