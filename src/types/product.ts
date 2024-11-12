import { Prisma } from "@prisma/client";
import prisma from "../db";

export type ProductCreateBody = Prisma.Args<
  typeof prisma.product,
  "create"
>["data"];
