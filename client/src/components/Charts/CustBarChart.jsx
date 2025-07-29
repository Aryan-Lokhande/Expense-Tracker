import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import React from "react";
import moment from "moment";

export default function CustBarChart({ data }) {
  const sortedData = [...data].sort(
    (a, b) =>
      moment(a.date, "Do MMM").toDate() - moment(b.date, "Do MMM").toDate()
  );
  // console.log("data:", data);

  // Function to determine bar colors
  const getBarColor = (index) => {
    return index % 2 === 0 ? "var(--color-accent)" : "#A98BFF";
  };
 const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-secondary border border-gray-700 rounded-lg p-2 shadow-lg text-white">
          <p className="text-xs font-semibold text-accent mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-400">
            Amount:{" "}
            <span className="font-medium text-gray-300">
              ₹{payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-secondary mt-6 rounded-2xl border border-gray-700 shadow-md shadow-black/10 p-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#d2dadf" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#d2dadf" }} stroke="#2E2E2E" />
          <Tooltip content={CustomTooltip} />
          <Bar
            dataKey="amount"
            fill="var(--color-secondary)"
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
          <Legend
            wrapperStyle={{
              color: "#B0BEC5",
              fontSize: "12px",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
