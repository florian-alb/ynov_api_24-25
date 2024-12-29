import prisma from "../db";
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
  const count = await prisma.folder.count({
    where: {
      name: data.name,
    },
  });
  if (count > 0) throw new Error("Folder already exists");

  return await prisma.folder.create({
    data: { ...data, userId },
  });
};

export const update = async (
  userId: string,
  id: string,
  data: FolderCreateBody
) => {
  return await prisma.folder.update({
    where: {
      id,
    },
    data: { ...data, userId },
  });
};

export const deleteById = async (userId: string, id: string) => {
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
