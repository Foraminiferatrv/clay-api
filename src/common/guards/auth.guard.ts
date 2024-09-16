import { CanActivate, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }

  async canActivate(context: GqlExecutionContext): Promise<boolean> {
    const request = context.getArgByIndex(2).req;

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      });

      request["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
