import express from "express";
import { chatbot } from "../services/chatBot";

const router = express.Router();

router.post("/chatbot-start", chatbot);
export default router;
