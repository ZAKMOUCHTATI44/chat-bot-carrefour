import cors from "cors";
import express, { Request, Response } from "express";
import router from "./router/app";
import routerAuth from "./router/auth";
import { chatbot } from "./services/chatBot";

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD");
});

app.use("/api/", router);

app.use("/auth/", routerAuth);

app.post("/chatbot-start", chatbot);

app.listen(6000, () => console.log("APP WAS RUNING !!!"));
