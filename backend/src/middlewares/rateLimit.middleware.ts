import rateLimit from "express-rate-limit";

const FIFTEEN_MINUTES = 15 * 60 * 1000;

function createLimiterResponse(message: string) {
  return {
    success: false,
    message,
    error: message,
  };
}

/**
 * General API Rate Limiter
 * Applied across all `/api/*` routes to prevent scraping and basic Denial-of-Service attacks.
 */
export const globalApiLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: 100, // 100 requests per 15 minutes per IP
  standardHeaders: "draft-7",
  legacyHeaders: false,
  statusCode: 429,
  message: createLimiterResponse("Too many requests from this IP, please try again after 15 minutes."),
});

// Alias for backward compatibility
export const globalRateLimiter = globalApiLimiter;

/**
 * Strict Auth Rate Limiter
 * Protects login and sensitive auth endpoints against credential stuffing and brute force.
 */
export const loginRateLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: 5, // 5 failed attempts per 15 minutes per IP
  standardHeaders: "draft-7",
  legacyHeaders: false,
  statusCode: 429,
  message: createLimiterResponse("Too many login attempts. Please try again after 15 minutes."),
});

/**
 * Strict Contact Form Limiter
 * Protects contact submission against automated spam bots.
 */
export const contactRateLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: 5, // 5 submissions per 15 minutes
  standardHeaders: "draft-7",
  legacyHeaders: false,
  statusCode: 429,
  message: createLimiterResponse("Too many contact submissions. Please try again later."),
});


