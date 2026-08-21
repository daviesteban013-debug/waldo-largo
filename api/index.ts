import app from "../backend/src/app";

/**
 * Vercel Serverless Function entry point for the backend API.
 * Delegates all `/api/*` HTTP traffic to the Express application.
 */
export default app;
