import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHealthCheck() {
    return "ok";
  }
}
