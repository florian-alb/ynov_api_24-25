import { Prisma } from "@prisma/client";
import prisma from "../db";
import { UserCreateBody, UserLoginBody } from "../types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  const count = await prisma.user.count({
    where: {
      emailAddress: data.emailAddress,
    },
  });
  if (count > 0) throw new Error("Username already exists");

  data.password = bcrypt.hashSync(
    data.password,
    parseInt(process.env.BCRYPT_SALT_ROUNDS || "10")
  );

  const user = await prisma.user.create({
    data,
    select: {
      id: true,
      emailAddress: true,
      name: true,
    },
  });

  return user;
};

export const login = async (data: UserLoginBody) => {
  const user = await prisma.user.findUnique({
    where: {
      emailAddress: data.emailAddress,
    },
  });

  if (!user) throw new Error("User not found");

  if (!bcrypt.compareSync(data.password, user.password))
    throw new Error("Invalid password");

  // Generate a token here
  const token = jwt.sign(
    {
      id: user.id,
      username: user.name,
      email: user.emailAddress,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );

  return token;
};
