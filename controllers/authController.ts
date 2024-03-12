import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signin(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "user not found !",
    });
  }

  const result = await bcrypt.compare(password, user.password);

  if (result) {
    let token = jwt.sign(user.email, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } else {
    res.status(400).json({
      error: "mail or password incorrect",
    });
  }
}

export async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      password: await encryptPassword(password),
      email,
    },
  });

  let token = jwt.sign(user.email, process.env.JWT_SECRET);

  res.json({
    token,
    user: {
      email: user.email,
      name: user.name,
    },
  });
}

const encryptPassword = async (password: string): Promise<string> => {
  const res = await bcrypt.hash(password, 10);
  return res;
};
