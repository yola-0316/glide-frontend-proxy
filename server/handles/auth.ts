import chalk from "chalk";
import { IHandleRewire } from "../type";

export const handleAuth: IHandleRewire = ({ response, proxyRes, req, res }) => {
  if (proxyRes.headers?.location) {
    const { protocol, hostname, statusCode, url } = req;
    const { headers } = proxyRes;

    console.log(
      chalk.yellow`[proxy location ${res.statusCode}] --- ${chalk.blue`${headers.location}`}`
    );

    console.log("[proxy headers]-----", proxyRes.headers);
  }

  return { response, proxyRes, req, res };
};
