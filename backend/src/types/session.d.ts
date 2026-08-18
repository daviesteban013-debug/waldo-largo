import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

export interface AuthenticatedRequest extends Express.Request {
  session: Express.Session & { userId?: string };
}
