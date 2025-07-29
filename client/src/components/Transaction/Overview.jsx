import { LuPlus } from "react-icons/lu";
import React, { useState, useEffect, useMemo } from "react";
import {
  prepareExpenseLineChartData,
  getUniqueMonthsFromData,
} from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart.jsx";

const Overview = ({ transactions, onExpenseIncome, view }) => {
  const [chartData, setChartData] = useState([]);
  const [viewType, setViewType] = useState("Expense");
  const [selectedMonth, setSelectedMonth] = useState("");
  // console.log("transactions: ", transactions);

  const months = useMemo(() => getUniqueMonthsFromData(chartData), [chartData]);

  const filteredData = useMemo(() => {
    if (!selectedMonth) return chartData;
    return chartData.filter((item) => item.month === selectedMonth);
  }, [selectedMonth, chartData]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
    setViewType(view || "Expense");
    return () => {
      // Cleanup function (optional)
    };
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="">
          <h5 className="text-lg">{viewType} Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Analyze your {viewType.toLowerCase()} trends and gain insights into
            your financial habits.
          </p>
        </div>

        {/* Month Selector (Collider) */}
        <div className="flex items-center gap-5">
          <select
            className="text-sm px-3 py-1 border border-gray-300 rounded-md outline-none border-secondary/40 bg-accent/30 text-accent"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <button className="add-btn" onClick={onExpenseIncome}>
            <LuPlus className="text-lg" />
            Add {viewType}
          </button>
        </div>
      </div>

      <div className="mt-10">
        <CustomLineChart data={filteredData} view={viewType} />
      </div>
    </div>
  );
};

export default Overview;
