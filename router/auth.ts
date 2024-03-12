import express, { Request, Response } from "express";
import { signin,signup } from "../controllers/authController";

const router = express.Router();

router.post("/signin", signin);

router.post("/signup",signup)

router.post("/logout", (req: Request, res: Response) => {});

export default router;
