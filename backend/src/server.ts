import { createApp } from "./app";
import { env, isVercel } from "./config/env";
import { prisma } from "./lib/prisma";
import { logger } from "./utils/logger";

const app = createApp();

/**
 * Serverless vs Local Runtime Separation
 * In Vercel, the function is invoked per request via event handlers and MUST NOT open a persistent TCP port.
 * Locally or in container environments (Docker/Railway), we start the HTTP listener normally.
 */
if (!isVercel) {
  const server = app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT} (mode: ${env.NODE_ENV})`);
  });

  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}, shutting down gracefully...`);
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

export default app;

