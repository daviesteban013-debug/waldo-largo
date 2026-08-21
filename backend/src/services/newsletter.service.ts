import { prisma } from "../lib/prisma";
import { resend } from "../lib/resend";
import { env } from "../config/env";
import { AppError } from "../utils/errors";
import { sanitizeEmail } from "../utils/sanitize";
import { generateToken, hashToken } from "../utils/tokens";
import { SubscriberListQuery } from "../schemas/admin.schema";
import { SubscriberStatus } from "@prisma/client";
import { logger } from "../utils/logger";

const CONFIRM_TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function subscribe(emailInput: string) {
  const email = sanitizeEmail(emailInput);

  const existing = await prisma.newsletterSubscriber.findUnique({
    where: { email },
  });

  if (existing?.status === "CONFIRMED") {
    return { success: true, message: "Already subscribed" };
  }

  const confirmToken = generateToken();
  const confirmTokenHash = hashToken(confirmToken);
  const confirmExpiresAt = new Date(Date.now() + CONFIRM_TOKEN_TTL_MS);

  if (existing) {
    await prisma.newsletterSubscriber.update({
      where: { email },
      data: {
        status: "PENDING",
        confirmTokenHash,
        confirmExpiresAt,
        unsubscribedAt: null,
      },
    });
  } else {
    await prisma.newsletterSubscriber.create({
      data: {
        email,
        status: "PENDING",
        confirmTokenHash,
        confirmExpiresAt,
      },
    });
  }

  const confirmUrl = `${env.FRONTEND_URL}/newsletter/confirm?token=${confirmToken}`;

  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject: "Confirma tu suscripción al newsletter",
    text: [
      "Gracias por suscribirte.",
      "",
      "Por favor confirma tu email haciendo clic en el siguiente enlace:",
      confirmUrl,
      "",
      "Este enlace expira en 24 horas.",
      "",
      "Si no solicitaste esta suscripción, ignora este mensaje.",
    ].join("\n"),
  });

  if (error) {
    logger.error("Failed to send newsletter confirmation email:", error);
    throw new AppError(502, "Failed to send confirmation email");
  }

  return { success: true, message: "Confirmation email sent" };
}


export async function confirmSubscription(token: string) {
  const confirmTokenHash = hashToken(token);

  const subscriber = await prisma.newsletterSubscriber.findUnique({
    where: { confirmTokenHash },
  });

  if (!subscriber) {
    throw new AppError(400, "Invalid or expired confirmation token");
  }

  if (
    subscriber.confirmExpiresAt &&
    subscriber.confirmExpiresAt < new Date()
  ) {
    throw new AppError(400, "Confirmation token has expired");
  }

  if (subscriber.status === "CONFIRMED") {
    return { success: true, message: "Already confirmed" };
  }

  await prisma.newsletterSubscriber.update({
    where: { id: subscriber.id },
    data: {
      status: "CONFIRMED",
      confirmedAt: new Date(),
      confirmTokenHash: null,
      confirmExpiresAt: null,
    },
  });

  return { success: true, message: "Subscription confirmed" };
}

export async function unsubscribe(token: string) {
  const subscriber = await prisma.newsletterSubscriber.findUnique({
    where: { unsubscribeToken: token },
  });

  if (!subscriber) {
    throw new AppError(400, "Invalid unsubscribe token");
  }

  if (subscriber.status === "UNSUBSCRIBED") {
    return { success: true, message: "Already unsubscribed" };
  }

  await prisma.newsletterSubscriber.update({
    where: { id: subscriber.id },
    data: {
      status: "UNSUBSCRIBED",
      unsubscribedAt: new Date(),
      confirmTokenHash: null,
      confirmExpiresAt: null,
    },
  });

  return { success: true, message: "Successfully unsubscribed" };
}

export async function confirmViaApi(token: string) {
  return confirmSubscription(token);
}

export async function listSubscribers(query: SubscriberListQuery) {
  const { page, limit, status } = query;
  const skip = (page - 1) * limit;

  const where = status ? { status: status as SubscriberStatus } : {};

  const [subscribers, total] = await Promise.all([
    prisma.newsletterSubscriber.findMany({
      where,
      select: {
        id: true,
        email: true,
        status: true,
        confirmedAt: true,
        unsubscribedAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.newsletterSubscriber.count({ where }),
  ]);

  return {
    subscribers,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
