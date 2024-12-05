import { Request, Response } from "express";
import { getAll, create } from "../services/user.service";

export const get = async (req: Request, res: Response) => {
  const data = await getAll(
    req.query.sortBy as string | undefined,
    req.query.sortDir as "asc" | "desc" | undefined
  );
  res.json({
    success: true,
    data,
  });
};

export const add = async (req: Request, res: Response) => {
  const product = await create(req.body);
  res.status(201).json({
    success: true,
    data: product,
  });
};
