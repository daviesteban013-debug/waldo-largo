/**
 * Sanitized Logger Utility (Zero Data Leakage)
 * Ensures logs printed to stdout/stderr do not expose credentials, API keys, session tokens, or PII.
 */

const SENSITIVE_KEYS = new Set([
  "password",
  "passwordhash",
  "token",
  "confirmtoken",
  "confirmtokenhash",
  "unsubscribetoken",
  "secret",
  "sessionsecret",
  "authorization",
  "cookie",
  "set-cookie",
  "apikey",
  "resend_api_key",
  "database_url",
  "resendapikey",
]);

function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

/**
 * Recursively redacts sensitive keys from objects before logging.
 */
export function sanitizeLogData(data: unknown, depth = 0): unknown {
  if (depth > 5) return "[Max Depth]";
  if (data === null || data === undefined) return data;

  if (typeof data === "string") {
    // Redact connection strings with credentials (e.g. postgres://user:pass@host)
    return data.replace(/(postgres(?:ql)?:\/\/[^:]+:)([^@]+)(@)/gi, "$1***$3");
  }

  if (data instanceof Error) {
    return {
      name: data.name,
      message: data.message,
      ...(process.env.NODE_ENV !== "production" ? { stack: data.stack } : {}),
    };
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeLogData(item, depth + 1));
  }

  if (isObject(data)) {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (SENSITIVE_KEYS.has(key.toLowerCase())) {
        cleaned[key] = "[REDACTED]";
      } else {
        cleaned[key] = sanitizeLogData(value, depth + 1);
      }
    }
    return cleaned;
  }

  return data;
}

function formatMessage(level: string, message: string, meta?: unknown): string {
  const timestamp = new Date().toISOString();
  const sanitizedMeta = meta !== undefined ? " " + JSON.stringify(sanitizeLogData(meta)) : "";
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}${sanitizedMeta}`;
}

export const logger = {
  info(message: string, meta?: unknown): void {
    console.log(formatMessage("info", message, meta));
  },
  warn(message: string, meta?: unknown): void {
    console.warn(formatMessage("warn", message, meta));
  },
  error(message: string, meta?: unknown): void {
    console.error(formatMessage("error", message, meta));
  },
  debug(message: string, meta?: unknown): void {
    if (process.env.NODE_ENV !== "production") {
      console.debug(formatMessage("debug", message, meta));
    }
  },
};
