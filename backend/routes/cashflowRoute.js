import express from "express";
import { addExpense, deleteExpense, getAllExpense, downloadExpenseExcel } from "../controllers/expenseController.js";
import { addIncome, deleteIncome, getAllIncome, downloadIncomeExcel } from "../controllers/incomeController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/expense/add", auth, addExpense);
router.get("/expense/get", auth, getAllExpense);
router.get("/expense/downloadexcel", auth, downloadExpenseExcel);
router.delete("/expense/:id", auth, deleteExpense);

router.post("/income/add", auth, addIncome);
router.get("/income/get", auth, getAllIncome);
router.get("/income/downloadexcel", auth, downloadIncomeExcel);
router.delete("/income/:id", auth, deleteIncome);

export default router;
