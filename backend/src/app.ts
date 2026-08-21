import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import hpp from "hpp";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import { corsMiddleware } from "./middlewares/cors.middleware";
import { sessionMiddleware } from "./middlewares/session.middleware";
import { csrfProtection } from "./middlewares/csrf.middleware";
import { globalApiLimiter } from "./middlewares/rateLimit.middleware";
import { env, isProduction } from "./config/env";

export function createApp() {
  const app = express();

  // 1. Cybersecurity Hardening: Explicitly remove X-Powered-By
  app.disable("x-powered-by");

  // 2. Trust Proxy configuration for Vercel / Railway / reverse proxies
  if (env.TRUST_PROXY || isProduction) {
    app.set("trust proxy", 1);
  }

  // 3. Strict HTTPS enforcement in production
  if (isProduction) {
    app.use((req: Request, res: Response, next: NextFunction) => {
      const proto = req.headers["x-forwarded-proto"];
      if (proto && proto !== "https") {
        res.status(403).json({
          success: false,
          message: "HTTPS required",
          error: "HTTPS required",
        });
        return;
      }
      next();
    });
  }

  // 4. Strict Security Headers via Helmet
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", env.FRONTEND_URL],
          fontSrc: ["'self'", "https:", "data:"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: isProduction ? [] : null,
        },
      },
      hsts: isProduction
        ? {
            maxAge: 31536000, // 1 year
            includeSubDomains: true,
            preload: true,
          }
        : false,
      noSniff: true,
      xssFilter: true,
      frameguard: { action: "deny" },
      hidePoweredBy: true,
    })
  );

  // 5. CORS and HTTP Parameter Pollution Protection
  app.use(corsMiddleware);
  app.use(hpp());

  // 6. Body Parsers with Controlled Limits
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: false, limit: "1mb" }));

  // 7. URL & Trailing Slash Normalization
  // Ensures `/api/posts/` is normalized to `/api/posts` internally without redundant redirects
  app.use((req: Request, _res: Response, next: NextFunction) => {
    if (req.path.length > 1 && req.path.endsWith("/")) {
      const newPath = req.path.slice(0, -1);
      const query = req.url.slice(req.path.length);
      req.url = newPath + query;
    }
    next();
  });

  // 8. Session & CSRF Security Middlewares
  app.use(sessionMiddleware);
  app.use(csrfProtection);

  // 9. API Routing & Vercel Prefix Compatibility
  // Mounts routes under `/api` for standard requests
  app.use("/api", globalApiLimiter, routes);

  // Mounts routes at root fallback for direct serverless function rewrites
  app.use("/", globalApiLimiter, routes);

  // 10. Standardized 404 Handler (Zero Data Leakage)
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: "Resource not found",
      error: "Not found",
    });
  });

  // 11. Centralized Global Error Handler
  app.use(errorHandler);

  return app;
}

export const app = createApp();
export default app;

