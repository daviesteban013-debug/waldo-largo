import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { env, isProduction } from "../config/env";

const PgSession = connectPgSimple(session);

const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Hardened Session Middleware
 * - Storage: PostgreSQL table `session`
 * - Cookie Security:
 *   - httpOnly: true (blocks XSS reading session cookie)
 *   - secure: true in production (enforces HTTPS)
 *   - sameSite: 'lax' for unified monorepo security (mitigates CSRF)
 *   - maxAge: 7 days expiration
 */
export const sessionMiddleware = session({
  store: new PgSession({
    conString: env.DATABASE_URL,
    tableName: "session",
    createTableIfMissing: true,
    pruneSessionInterval: 60 * 60, // Prune expired sessions every hour
  }),
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: isProduction ? "__Secure-sid" : "sid",
  proxy: env.TRUST_PROXY || isProduction,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_MS,
    path: "/",
  },
});

