import cors from "cors";
import { env } from "../config/env";

export const corsMiddleware = cors({
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
});
