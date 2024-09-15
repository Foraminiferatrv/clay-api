import { Injectable } from "@nestjs/common";
import type { TUserData } from "src/models/user.model";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class SignUpService {
  constructor(private usersService: UsersService) {}

  async createNewUser(userData: TUserData) {
    return this.usersService.createNewUser(userData);
  }
}
