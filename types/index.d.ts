import { User } from "@prisma/client";
import express from "express"

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}


export interface AuthRequest extends express.Request {
  user: User; // Replace with your user type
}