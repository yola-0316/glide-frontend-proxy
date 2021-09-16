import type * as http from "http";
import type { Request, Response } from "express";

export type InterceptorObj = {
  response: string;
  proxyRes: Request;
  req: Request;
  res: Response;
};

export type IHandleRewire = (o: InterceptorObj) => InterceptorObj;
