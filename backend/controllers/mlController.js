import Expense from "../models/Expense.js";
import axios from "axios";

export const getForecast = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({ userId }).sort({ date: 1 });

    const formattedData = expenses.map((e) => ({
      amount: e.amount,
      date: e.date,
    }));

    const flaskRes = await axios.post(`${process.env.ML_SERVER_URL}/forecast`, formattedData);
    res.json(flaskRes.data);
  } catch (error) {
    console.log("ML Forecast Error:", error.message);
    res.status(500).json({ message: "Failed to get ML forecast" });
  }
};


export const getMonthWiseExpenses = async (req, res) => {
    try {
    const userId = req.user.id;

    const expenses = await Expense.find({ userId }).sort({ date: 1 });

    // Group by YYYY-MM
    const grouped = {};
    expenses.forEach((e) => {
      const month = new Date(e.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      if (!grouped[month]) grouped[month] = 0;
      grouped[month] += e.amount;
    });

    const result = Object.entries(grouped).map(([month, total]) => ({
      month,
      total,
    }));

    res.json(result);
  } catch (err) {
    console.error("Month-wise error:", err);
    res.status(500).json({ message: "Error fetching monthly expenses" });
  }
};