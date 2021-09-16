import http from "http";
import https from "https";
import chalk from "chalk";
import express from "express";
import { certificateFor } from "devcert";
import { createProxyMiddleware, responseInterceptor, fixRequestBody } from "http-proxy-middleware";

import { target, port, localAssetsServer } from "./config";
import { handleAuth, handlePageRewire } from "./handles";
import { pipe } from "./utils";

import { InterceptorObj } from "./type";

const app = express();

const resHandler = pipe(handleAuth, handlePageRewire);

// proxy static assets to local server
app.use(
  "/assets",
  createProxyMiddleware("/assets", { target: localAssetsServer, changeOrigin: true })
);

// proxy anything to upstream that include html and apis
app.use(
  "*",
  createProxyMiddleware({
    target,
    changeOrigin: true,
    followRedirects: true,
    onProxyReq: fixRequestBody,
    selfHandleResponse: true,
    onProxyRes: responseInterceptor(
      async (responseBuffer, proxyRes, req, res) =>
        resHandler({
          response: responseBuffer.toString("utf8"),
          proxyRes,
          req,
          res,
        } as unknown as InterceptorObj).response
    ),
  })
);

http.createServer(app).listen(port.http, () => {
  console.log(chalk.green`Glide proxy at http://dev.app.glide.com:${port.http}`);
});

(async () => {
  let ssl = await certificateFor("dev.app.glide.com");
  let server = https.createServer(ssl, app);
  server.listen(port.https, () => {
    console.log(chalk.green`Glide proxy at https://dev.app.glide.com:${port.https}`);
  });
})();
