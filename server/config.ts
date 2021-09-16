export const port = {
  http: 31080,
  https: 31443,
};

type ENV = "prod" | "gamma" | "staging" | "dev" | "local";

type TargetMap = {
  [key in ENV]: {
    host: string;
    public: string;
  };
};

export const env: ENV = "staging";

export const targetMap: TargetMap = {
  prod: { host: "https://app.glide.com", public: "https://d1yrpcunshmejj.cloudfront.net/" },
  gamma: { host: "https://app.glide.com", public: "https://d1yrpcunshmejj.cloudfront.net/" },
  staging: { host: "https://staging3.glid.to", public: "/assets/" },
  dev: { host: "https://app.dev.glide.com", public: "https://d1yrpcunshmejj.cloudfront.net/" },
  local: { host: "http://webapp.localhost", public: "http://jsapp.localhost:3000/assets/" },
};

export const target = targetMap[env].host;

export const localAssetsServer = "http://localhost:3000";
