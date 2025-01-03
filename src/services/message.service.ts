import { MessageCreateBody, MessageUpdateBody } from "../types/message";
import prisma from "../db";
import { AppError } from "../types/appError";
import { MessageStatus } from "@prisma/client";
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
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const message = {
    ...data,
    userId,
    isDraft: true,
    sender: user!.emailAddress,
  };

  return await prisma.message.create({
    data: message,
  });
};

export const moveToFolder = async (
  userId: string,
  id: string,
  folderId: string
) => {
  const message = await getById(userId, id);

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  const folder = await prisma.folder.findUnique({
    where: {
      id: folderId,
      userId,
    },
  });

  if (!folder) {
    throw new AppError("Folder not found", 404);
  }

  return await prisma.message.update({
    where: { id, userId },
    data: { folderId },
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

  if (!message.isDraft) {
    throw new AppError("Only draft messages can be updated", 400);
  }

  return await prisma.message.update({
    where: { id, userId },
    data,
  });
};

export const updateStatus = async (
  userId: string,
  id: string,
  status: MessageStatus
) => {
  if (status !== MessageStatus.READ && status !== MessageStatus.UNREAD) {
    throw new AppError("Invalid status", 400);
  }

  const message = await getById(userId, id);

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  return await prisma.message.update({
    where: { id, userId },
    data: { status },
  });
};

export const deleteById = async (userId: string, id: string) => {
  return await prisma.message.delete({
    where: { id, userId },
  });
};

export const toggleFavorite = async (userId: string, id: string) => {
  const message = await getById(userId, id);

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  return await prisma.message.update({
    where: { id, userId },
    data: { isFavorite: !message.isFavorite },
  });
};

export const send = async (userId: string, id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const message = await getById(userId, id);

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  if (message.sender !== user!.emailAddress) {
    throw new AppError("You are not the sender of this message", 400);
  }

  if (!message.isDraft) {
    throw new AppError("Message is not a draft", 400);
  }

  if (message.isSent) {
    throw new AppError("Message already sent", 400);
  }

  if (message.isTrash) {
    throw new AppError("Message is in trash", 400);
  }

  if (message.recipients.length === 0) {
    throw new AppError("Message has no recipients", 400);
  }

  return await prisma.message.update({
    where: { id, userId },
    data: { isSent: true, isDraft: false },
  });

  // TODO: Send email to recipients
};

export const toggleTrash = async (userId: string, id: string) => {
  const message = await getById(userId, id);

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  return await prisma.message.update({
    where: { id, userId },
    data: { isTrash: !message.isTrash },
  });
};
