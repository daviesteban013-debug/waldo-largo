import rateLimit from "express-rate-limit";

const FIFTEEN_MINUTES = 15 * 60 * 1000;

export const globalRateLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later" },
});

export const loginRateLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts, please try again later" },
});

export const contactRateLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many contact requests, please try again later" },
});

export const newsletterRateLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many subscription attempts, please try again later" },
});
