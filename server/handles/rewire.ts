import chalk from "chalk";
import cheerio from "cheerio";
import { env, targetMap, port } from "../config";
import { IHandleRewire } from "../type";

// TODO: rewire Glide Config
const GlideConfig = {};

export const handlePageRewire: IHandleRewire = ({ response, proxyRes, req, res }) => {
  if (proxyRes.headers?.["content-type"]?.match(/text\/html;/)) {
    const { protocol, hostname, url } = req;
    const ptcol = protocol as keyof typeof port;

    const staticBasepath = `${protocol}://${hostname}:${port[ptcol]}/assets/`;

    console.log(chalk.yellow`[proxy html ${res.statusCode}] --- ${chalk.blue`${url}`}`, hostname);

    response = response.replace(
      `window.WEBPACK_PUBLIC_PATH = '${targetMap[env].public}';`,
      `window.WEBPACK_PUBLIC_PATH = '${staticBasepath}';`
    );

    const $ = cheerio.load(response);

    $(`script[src^="${targetMap[env].public}"]`).remove();
    $(`script[src^="https://apis.google.com"]`).before(
      `<script type="text/javascript" src="${staticBasepath}app.js"></script>`
    );
    response = $.html();
  }

  return { response, proxyRes, req, res };
};
