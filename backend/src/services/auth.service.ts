import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/errors";
import { LoginInput } from "../schemas/auth.schema";

const BCRYPT_ROUNDS = 12;

export async function loginUser(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
  });

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) {
    throw new AppError(401, "Invalid email or password");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true },
  });

  if (!user) {
    throw new AppError(401, "User not found");
  }

  return user;
}

export { BCRYPT_ROUNDS };
