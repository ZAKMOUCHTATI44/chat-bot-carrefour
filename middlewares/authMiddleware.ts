import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma";
import { AuthRequest } from "../types";

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  try {
    let email = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    const user = await prisma.user.findFirstOrThrow({
      where: {
        email,
      },
    });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
}
