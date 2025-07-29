import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip.jsx";
import CustomLegend from "./CustomLegend.jsx";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>

        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { name, amount } = payload[0].payload;
              return (
                <div className="bg-secondary text-white border border-gray-700 p-2 rounded shadow-md text-sm">
                  <p className="font-semibold text-accent mb-1">
                    {name}
                  </p>
                  <p>
                    ₹<span className="font-medium">{amount}</span>
                  </p>
                </div>
              );
            }
            return null;
          }}
        />

        <Legend
          content={({ payload }) => (
            <ul className="flex justify-center gap-4 mt-4 text-sm text-gray-300">
              {payload.map((entry, index) => (
                <li key={`item-${index}`} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 inline-block rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  {entry.value}
                </li>
              ))}
            </ul>
          )}
        />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#B0BEC5"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#ECEFF1"
              fontSize="24px"
              fontWeight="600"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
