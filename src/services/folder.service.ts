import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../db";
import { AppError } from "../types/appError";
import { FolderCreateBody } from "../types/folder";

export const getAll = async (userId: string) => {
  return await prisma.folder.findMany({
    where: {
      userId,
    },
  });
};

export const getById = async (userId: string, id: string) => {
  return await prisma.folder.findUnique({
    where: {
      id,
      userId,
    },
  });
};

export const add = async (userId: string, data: FolderCreateBody) => {
  try {
    return await prisma.folder.create({
      data: { ...data, userId },
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AppError(
        "A folder with the same name already exists for this user.",
        409
      );
    }
    throw error;
  }
};

export const update = async (
  userId: string,
  id: string,
  data: FolderCreateBody
) => {
  let folder = await getById(userId, id);

  if (!folder) {
    throw new AppError("Folder not found", 404);
  }

  try {
    folder = await prisma.folder.update({
      where: {
        id,
      },
      data: { ...data, userId },
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AppError(
        "A folder with the same name already exists for this user.",
        409
      );
    }
    throw error;
  }
  return folder;
};

export const deleteById = async (userId: string, id: string) => {
  const defaultFolders = ["Favorites", "Sent", "Drafts", "Trash"];

  const folder = await getById(userId, id);

  if (!folder) {
    throw new AppError("Folder not found", 404);
  }

  if (defaultFolders.includes(folder.name)) {
    throw new AppError("Default folders cannot be deleted", 403);
  }

  if (await getById(userId, id)) {
    await prisma.folder.delete({
      where: {
        id,
      },
    });
    return true;
  }
  return false;
};
