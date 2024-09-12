import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Getting the request log
    console.log(`req:`, {
      headers: req.headers,
      body: req.body,
      originalUrl: req.originalUrl
    });

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
