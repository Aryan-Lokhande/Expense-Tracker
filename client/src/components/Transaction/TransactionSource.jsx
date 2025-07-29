import React, {useEffect, useState,useMemo} from "react";

import CustomBarChart from "../Charts/CustBarChart.jsx";
import {prepareIncomeBarChartData} from "../../utils/helper";
import {prepareExpenceBarChartData, getUniqueMonthsFromData} from "../../utils/helper";

const TransactionSource = ({transactions, type}) => {
  const [chartData, setChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  // console.log("chartData: ", chartData);

  // Unique month list from your data
  const months = useMemo(() => getUniqueMonthsFromData(chartData), [chartData]);

  // Filtered data for selected month
  const filteredData = useMemo(() => {
    if (!selectedMonth) return chartData;
    return chartData.filter((item) => item.month === selectedMonth);
  }, [selectedMonth, chartData]);

  useEffect(() => {
    let result;
    if(type == "Expense") {
        result =  prepareExpenceBarChartData(transactions);
    }else{
        result = prepareIncomeBarChartData(transactions);
    }
    // console.log("Income Chart Data:", result);
    setChartData(result);

    return () => {
      // Cleanup function if needed
    };
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">{type} Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Analyze your {type.toLowerCase()} category wise and gain insights into your financial habits.
          </p>
        </div>

        {/* Month Selector (Collider) */}
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
      </div>

      <div className="mt-10">
        <CustomBarChart data={filteredData} />
      </div>
    </div>
  );
};

export default TransactionSource;
