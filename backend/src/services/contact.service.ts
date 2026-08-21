import { prisma } from "../lib/prisma";
import { resend } from "../lib/resend";
import { env } from "../config/env";
import { sanitizeEmail, sanitizeMessage, sanitizeName } from "../utils/sanitize";
import { ContactInput } from "../schemas/contact.schema";
import { ContactListQuery } from "../schemas/admin.schema";
import { logger } from "../utils/logger";

export async function submitContact(
  input: ContactInput,
  meta: { ipAddress?: string; userAgent?: string },
) {
  const name = sanitizeName(input.name);
  const email = sanitizeEmail(input.email);
  const message = sanitizeMessage(input.message);

  const saved = await prisma.contactMessage.create({
    data: {
      name,
      email,
      message,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    },
  });

  // Send notification email — don't fail if Resend is down.
  // The message is already saved in DB as backup.
  let emailNotificationSent = false;

  try {
    const { error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: env.ADMIN_NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: [
        `Nombre: ${name}`,
        `Email: ${email}`,
        "",
        "Mensaje:",
        message,
        "",
        `ID: ${saved.id}`,
        `Fecha: ${saved.createdAt.toISOString()}`,
      ].join("\n"),
    });

    if (error) {
      logger.error("Failed to send contact notification email:", error);
    } else {
      emailNotificationSent = true;
    }
  } catch (err) {
    logger.error("Contact notification email error:", err);
  }

  return { success: true, emailNotificationSent };
}

export async function listContactMessages(query: ContactListQuery) {
  const { page, limit } = query;
  const skip = (page - 1) * limit;

  const [messages, total] = await Promise.all([
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.contactMessage.count(),
  ]);

  return {
    messages,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
