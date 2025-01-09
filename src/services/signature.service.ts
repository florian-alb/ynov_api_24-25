import prisma from "../db";
import { AppError } from "../types/appError";
import { SignatureCreateBody } from "../types/signature";

export const getAll = async (
  userId: string,
  page: number = 1,
  limit: number = 10
) => {
  return await prisma.signature.findMany({
    where: {
      userId,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
};

export const getById = async (userId: string, id: string) => {
  return await prisma.signature.findUnique({
    where: {
      id,
      userId,
    },
  });
};

export const getActive = async (userId: string) => {
  return await prisma.signature.findFirst({
    where: {
      userId,
      isActive: true,
    },
  });
};

export const add = async (userId: string, data: SignatureCreateBody) => {
  if (data.isActive) {
    await prisma.signature.updateMany({
      where: {
        userId,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });
  }

  return await prisma.signature.create({
    data: { ...data, userId },
  });
};

export const update = async (
  userId: string,
  id: string,
  data: SignatureCreateBody
) => {
  const signature = await getById(userId, id);

  if (!signature) {
    throw new AppError("Signature not found", 404);
  }

  if (data.isActive) {
    await prisma.signature.updateMany({
      where: {
        userId,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });
  }

  return await prisma.signature.update({
    where: {
      id,
    },
    data: { ...data, userId },
  });
};

export const deleteById = async (userId: string, id: string) => {
  if (await getById(userId, id)) {
    await prisma.signature.delete({
      where: {
        id,
      },
    });
    return true;
  }
  return false;
};
