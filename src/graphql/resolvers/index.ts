import { AppService } from "src/app.service";
import { UserResolver } from "./User.resolver";
import { AuthResolver } from "./Auth.resolver";

export const appResolvers = [AppService, UserResolver, AuthResolver];
