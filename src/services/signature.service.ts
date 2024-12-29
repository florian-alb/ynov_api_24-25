import prisma from "../db";
import { SignatureCreateBody } from "../types/signature";

export const getAll = async (userId: string) => {
  return await prisma.signature.findMany({
    where: {
      userId,
    },
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
    throw new Error("Signature not found");
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
