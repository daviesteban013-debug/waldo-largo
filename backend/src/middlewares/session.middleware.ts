import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { env, isProduction } from "../config/env";

const PgSession = connectPgSimple(session);

const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export const sessionMiddleware = session({
  store: new PgSession({
    conString: env.DATABASE_URL,
    tableName: "session",
    createTableIfMissing: true,
  }),
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: "sid",
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: SESSION_MAX_AGE_MS,
  },
});
