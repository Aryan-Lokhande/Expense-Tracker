import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#6C5DD3", "#FA2C37", "#00BC7D"];

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
  const balanceData = [
    {name: "Total Balance", amount: totalBalance},
    {name: "Total Expenses", amount: totalExpense},
    {name: "Total Income", amount: totalIncome},
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;