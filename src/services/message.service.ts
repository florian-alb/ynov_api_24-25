import { MessageCreateBody, MessageUpdateBody } from "../types/message";
import prisma from "../db";
import { AppError } from "../types/appError";

export const getAll = async (userId: string) => {
  return await prisma.message.findMany({
    where: {
      userId,
    },
  });
};

export const getById = async (userId: string, id: string) => {
  return await prisma.message.findUnique({
    where: {
      id,
      userId,
    },
  });
};

export const add = async (userId: string, data: MessageCreateBody) => {
  const draftFolder = await prisma.folder.findFirst({
    where: {
      userId,
      name: "Drafts",
    },
  });

  if (!draftFolder) {
    throw new AppError("Drafts folder not found", 404);
  }

  const message = {
    ...data,
    userId,
    folderId: draftFolder.id,
  };

  return await prisma.message.create({
    data: message,
  });
};

export const update = async (
  userId: string,
  id: string,
  data: MessageUpdateBody
) => {
  const message = await getById(userId, id);

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  if (data.folderId) {
    const folder = await prisma.folder.findUnique({
      where: {
        id: data.folderId,
        userId,
      },
    });

    if (!folder) {
      throw new AppError("Folder not found", 404);
    }
  }

  return await prisma.message.update({
    where: { id, userId },
    data,
  });
};

export const deleteById = async (userId: string, id: string) => {
  return await prisma.message.delete({
    where: { id, userId },
  });
};
