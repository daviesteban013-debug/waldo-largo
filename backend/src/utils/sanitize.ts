import sanitizeHtml from "sanitize-html";

const CONTROL_CHARS_REGEX = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

const DANGEROUS_HTML_REGEX =
  /<(script|iframe|object|embed|form|link|meta|style|base)[\s>]/gi;

export function sanitizePlainText(value: string, maxLength: number): string {
  return value.replace(CONTROL_CHARS_REGEX, "").trim().slice(0, maxLength);
}

export function sanitizeEmail(email: string): string {
  return sanitizePlainText(email.toLowerCase(), 254);
}

export function sanitizeExcerpt(value: string): string {
  const cleaned = sanitizePlainText(value, 500);
  return sanitizeHtml(cleaned, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

export function sanitizeMarkdown(content: string): string {
  const trimmed = content.replace(CONTROL_CHARS_REGEX, "").trim();

  if (DANGEROUS_HTML_REGEX.test(trimmed)) {
    throw new Error("Content contains disallowed HTML tags");
  }

  if (trimmed.length > 100_000) {
    throw new Error("Content exceeds maximum length");
  }

  return trimmed;
}

export function sanitizeMessage(value: string): string {
  const cleaned = sanitizePlainText(value, 5000);
  return sanitizeHtml(cleaned, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

export function sanitizeName(value: string): string {
  return sanitizePlainText(value, 100);
}

export function sanitizeUrl(url: string): string {
  const trimmed = sanitizePlainText(url, 2048);
  try {
    const parsed = new URL(trimmed);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Invalid URL protocol");
    }
    return parsed.toString();
  } catch {
    throw new Error("Invalid URL");
  }
}
