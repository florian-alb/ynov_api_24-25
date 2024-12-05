import { Prisma } from "@prisma/client";
import prisma from "../db";
import { UserCreateBody } from "../types/user";

/**
 * Returns all users, sorted by the provided field and direction
 * @param {string} sortBy - The field to sort by (optional)
 * @param {string} sortDirection - The direction to sort by (optional, default is 'ASC')
 * @returns {Array} - An array of users
 */
export const getAll = async (
  sortBy?: string,
  sortDirection: "asc" | "desc" = "asc"
) => {
  // Define the options for the Prisma query
  const options: Prisma.UserFindManyArgs = {
    select: {
      id: true,
      name: true,
    },
  };

  if (sortBy) {
    options.orderBy = {
      [sortBy]: sortDirection,
    };
  }

  return await prisma.user.findMany(options);
};

export const create = async (data: UserCreateBody) => {
  const user = await prisma.user.create({
    data: data,
  });

  return user;
};
