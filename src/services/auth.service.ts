import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { hashPassword } from "src/utils/hash-password";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async logIn(
    email: string,
    password: string
  ): Promise<{ access_token: string }> {
    const hashedPassword = await hashPassword(password);

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user?.password !== hashedPassword) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
