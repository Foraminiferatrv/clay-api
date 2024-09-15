import { Module } from "@nestjs/common";
import { SignUpController } from "./sign-up/sign-up.controller";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { SignUpService } from "./sign-up/sign-up.service";

@Module({
  controllers: [SignUpController],
  providers: [SignUpService, UsersService]
})
export class AuthModule {}
