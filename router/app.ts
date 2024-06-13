import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createStore,
  stores,
  deleteStore,
} from "../controllers/storeController";
import { statistic } from "../controllers/statisticController";
import { deleteTicktes, getTicket, tickets } from "../controllers/ticketsController";
import { histories } from "../controllers/historyController";

const router = express.Router();

// Apply authMiddleware for all the routes for get the current user auth 
router.use(authMiddleware);

// GET the statistic for the dashboard like the ("Localisation envoyée , Catalogue envoyé , Réclamation envoyée , BroadCast , Liste des messages par semaine , Aperçu des réclamations par status")
router.get("/statistic", statistic);

// GET the list of stores with the pagination the default size 10 and sort by name  and post mehtod for created new store 
router.route("/stores").get(stores).post(createStore);
// Delete store using the ID store
router.delete("/stores/:id", deleteStore);


// GET the list of stores with the pagination the default size 10 and sort by name
router.route("/tickets").get(tickets)
router.route("/tickets/:id").get(getTicket).delete(deleteTicktes)

// History of messages 

router.route("/history").get(histories)

export default router;
