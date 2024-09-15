import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Getting the request log
    // console.log(`\x1b[30m\x1b[103m\x1b[1m REQUEST-LOG: \x1b[0m\x1b[92m`, {
    //   headers: req.headers,
    //   body: req.body,
    //   originalUrl: req.originalUrl
    // });
    // console.log(`\x1b[30m\x1b[103m\x1b[1m --END-- \x1b[0m\x1b[92m`);

    // Getting the response log
    getResponseLog(res);

    if (next) {
      next();
    }
  }
}

const getResponseLog = (res: Response) => {
  return res;
};
