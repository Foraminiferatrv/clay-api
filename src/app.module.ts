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

const graphqlModule = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: "src/graphql/schema.gql"
});

@Module({
  imports: [graphqlModule],
  controllers: [AppController],
  providers: [...appResolvers, PrismaService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    });
  }
}
