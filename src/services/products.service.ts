import { Prisma } from "@prisma/client";
import prisma from "../db";
import { ProductCreateBody } from "../types/product";

/**
 * Returns all products, sorted by the provided field and direction
 * @param {string} sortBy - The field to sort by (optional)
 * @param {string} sortDirection - The direction to sort by (optional, default is 'ASC')
 * @returns {Array} - An array of users
 */
export const getAll = async (
  sortBy?: string,
  sortDirection: "asc" | "desc" = "asc"
) => {
  // Define the options for the Prisma query
  const options: Prisma.ProductFindManyArgs = {
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

  return await prisma.product.findMany(options);
};

export const create = async (data: ProductCreateBody) => {
  const user = await prisma.product.create({
    data: data,
  });

  return user;
};
