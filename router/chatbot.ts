import express from "express";
import { chatbot } from "../services/chatBot";

const router = express.Router();


// The route for handle the request of messages

router.post("/chatbot-start", chatbot);
export default router;
