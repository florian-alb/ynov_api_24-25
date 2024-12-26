import prisma from "../db";
import { UserCreateBody, UserLoginBody, UserUpadateBody } from "../types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const getById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      emailAddress: true,
    },
  });
};

export const deleteById = async (id: string) => {
  if (await getById(id)) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return true;
  }
  return false;
};

export const update = async (id: string, data: UserUpadateBody) => {
  return await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      emailAddress: true,
    },
  });
};
