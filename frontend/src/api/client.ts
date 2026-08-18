import type {
  ContactInput,
  ContactResponse,
  NewsletterSubscribeInput,
  NewsletterResponse,
  ApiErrorResponse,
} from "./types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

/* ─── Helpers ─── */

class ApiError extends Error {
  status: number;
  details?: ApiErrorResponse["details"];

  constructor(status: number, message: string, details?: ApiErrorResponse["details"]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    let body: ApiErrorResponse | null = null;
    try {
      body = await res.json();
    } catch {
      /* empty — non-JSON error */
    }
    throw new ApiError(
      res.status,
      body?.error ?? `Request failed with status ${res.status}`,
      body?.details,
    );
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json();
}

/* ─── Contact ─── */

export function submitContact(data: ContactInput): Promise<ContactResponse> {
  return request<ContactResponse>("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* ─── Newsletter ─── */

export function subscribeNewsletter(
  data: NewsletterSubscribeInput,
): Promise<NewsletterResponse> {
  return request<NewsletterResponse>("/newsletter/subscribe", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export { ApiError };
