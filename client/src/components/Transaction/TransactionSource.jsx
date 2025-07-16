import React, {useEffect, useState} from "react";
import {LuPlus} from "react-icons/lu";

import CustomBarChart from "../Charts/CustBarChart.jsx";
import {prepareIncomeBarChartData} from "../../utils/helper";
import {prepareExpenceBarChartData} from "../../utils/helper";

const TransactionSource = ({transactions, type}) => {
  const [chartData, setChartData] = useState([]);
  // console.log("chartData: ", chartData);

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
        <div className="">
          <h5 className="text-lg">{type} Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Analyze your {type.toLowerCase()} category wise and gain insights into your financial habits.  
          </p>
        </div>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default TransactionSource;