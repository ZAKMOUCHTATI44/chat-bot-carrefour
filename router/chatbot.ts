import express from "express";
import { chatbot } from "../services/chatBot";

const router = express.Router();

router.post("/chatbot-start", chatbot);

router.post("/chatbot-status");

export default router;
