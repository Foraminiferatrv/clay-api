import {
  type MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { LoggerMiddleware } from "./middleware/logger/logger.middleware";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { PrismaService } from "prisma/prisma.service";
import { appResolvers } from "./graphql/resolvers";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./services/auth.service";

const graphqlModule = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: "src/graphql/schema.gql"
});

const jwtModule = JwtModule.register({
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: "2d" }
});

@Module({
  imports: [graphqlModule, jwtModule],
  controllers: [AppController],
  providers: [...appResolvers, PrismaService, AuthService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    });
  }
}
