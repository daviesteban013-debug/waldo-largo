import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import hpp from "hpp";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import { corsMiddleware } from "./middlewares/cors.middleware";
import { sessionMiddleware } from "./middlewares/session.middleware";
import { csrfProtection } from "./middlewares/csrf.middleware";
import { globalRateLimiter } from "./middlewares/rateLimit.middleware";
import { env, isProduction } from "./config/env";

export function createApp() {
  const app = express();

  if (env.TRUST_PROXY) {
    app.set("trust proxy", 1);
  }

  if (isProduction) {
    app.use((req: Request, res: Response, next: NextFunction) => {
      const proto = req.headers["x-forwarded-proto"];
      if (proto && proto !== "https") {
        res.status(403).json({ error: "HTTPS required" });
        return;
      }
      next();
    });
  }

  app.use(helmet());
  app.use(corsMiddleware);
  app.use(hpp());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: false, limit: "1mb" }));
  app.use(sessionMiddleware);
  app.use(csrfProtection);
  app.use(globalRateLimiter);

  app.use(routes);

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use(errorHandler);

  return app;
}
