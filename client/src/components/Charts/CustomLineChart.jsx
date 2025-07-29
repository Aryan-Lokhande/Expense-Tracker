import React from "react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";
import { mergeDataByMonth } from "../../utils/helper";

const CustomLineChart = ({data,view}) => {
  // console.log("CustomLineChart data:", data);
  const mergedData = mergeDataByMonth(data);
  let color = "";
  if (view === "Income") {
    color = "#00bc7d";
  } else if (view === "Expense") {
    color = "#FA2C37";
  } else {
    color = "var(--color-accent)"; // Default color
  }
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { amount, categories } = payload[0].payload;
      return (
        <div className="bg-secondary border border-gray-700 text-white px-4 py-2 rounded text-sm shadow-lg shadow-black/10">
          {/* <p className="font-semibold text-gray-700">{label}</p> */}
          <p className="text-sm font-semibold text-accent">
            {categories?.join(", ")}
          </p>
          <p className="text-sm font-medium text-gray-300">
            <span className="text-sm text-gray-400">Amount:</span> ₹{amount}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="bg-secondary p-4 rounded-2xl shadow-md border border-gray-700">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={mergedData}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#d2dadf" }}
            stroke="none"
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#d2dadf" }}
            stroke="none"
            width={40}
          />
          <Tooltip content={CustomTooltip} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke={color}
            fill="url(#incomeGradient)"
            strokeWidth={3}
            dot={{ r: 3, fill: "#ECEFF1" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
