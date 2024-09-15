import { Global, Module } from "@nestjs/common";
import { UsersService } from "./users.service";

@Module({
  controllers: [],
  providers: [UsersService]
})
export class UsersModule {}
