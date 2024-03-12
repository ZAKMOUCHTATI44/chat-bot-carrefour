import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createStore,
  stores,
  deleteStore,
} from "../controllers/storeController";
import { statistic } from "../controllers/statisticController";

const router = express.Router();

router.use(authMiddleware);

router.get("/statistic", statistic);

router.route("/stores").get(stores).post(createStore);
router.delete("/stores/:id", deleteStore);

export default router;
