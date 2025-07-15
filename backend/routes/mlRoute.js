import express from "express";
import { getForecast, getMonthWiseExpenses } from "../controllers/mlController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/forecast", auth, getForecast);
router.get("/monthly-expense", auth, getMonthWiseExpenses);

export default router;
