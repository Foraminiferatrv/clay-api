import { Injectable } from "@nestjs/common";
import { TUser, TUserData } from "src/models/user.model";

@Injectable()
export class UsersService {
  async createNewUser(userData: TUserData): Promise<TUser> {
    console.log("NEW USER HAS BEEN Created", { userData });
    return { name: userData.name, id: "IDIDID" };
  }
}
