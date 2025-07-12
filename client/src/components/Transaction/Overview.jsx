import {LuPlus} from "react-icons/lu";
import React, {useState, useEffect} from "react";
import {prepareExpenseLineChartData} from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart.jsx";

const Overview = ({transactions, onExpenseIncome, view}) => {
  const [chartData, setChartData] = useState([]);
  const [viewType, setViewType] = useState("Expense");

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
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">{viewType} Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            {viewType} Overview: Analyze your {viewType.toLowerCase()} trends and gain insights into your financial habits.
          </p>
        </div>

        <button className="add-btn" onClick={onExpenseIncome}>
          <LuPlus className="text-lg" />
          Add {viewType}
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default Overview;