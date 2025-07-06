import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import authRoute from "./routes/authRoute.js";
// import dashboardRoute from "./routes/dashboardRoute.js";
// import cashflowRoute from "./routes/cashflowRoute.js";


dotenv.config();

const app = express();
await connectDB();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());

// app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/cashflow", cashflowRoute);
// app.use("/api/v1/dashboard", dashboardRoute);

// app.use("/api/v1/income", incomeRoutes);
// app.use("/api/v1/expense", expenseRoutes);

const PORT = process.env.PORT || 4000;
app.get('/', (req,res)=>{
    res.send("API is working");
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}\n Get directed to http://localhost:${PORT}`);
});