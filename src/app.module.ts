import {
  type MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./middleware/logger/logger.middleware";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { UserResolver } from "./graphql/resolvers/User.resolver";
import { PrismaService } from "prisma/prisma.service";

const graphqlConfig = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: "src/graphql/schema.gql"
});

@Module({
  imports: [AuthModule, UsersModule, graphqlConfig],
  controllers: [AppController],
  providers: [AppService, UserResolver, PrismaService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    });
  }
}
