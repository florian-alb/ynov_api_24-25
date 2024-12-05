import { Prisma } from "@prisma/client";
import prisma from "../db";

export type UserCreateBody = Prisma.Args<typeof prisma.user, "create">["data"];
