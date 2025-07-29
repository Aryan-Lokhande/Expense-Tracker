import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import InfoCard from "../../components/Cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { BsRobot } from "react-icons/bs";
import { TbChartHistogram, TbCalendarTime, TbBulb } from "react-icons/tb";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths";

export default function MLFeatures() {
  useUserAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState(null);
  const [monthWiseExpenses, setMonthWiseExpenses] = useState([]);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data) {
        setDashboardData(response.data);
        // console.log(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/ml/forecast");
      setForecast(res.data?.next_month_forecast || 0);
    } catch (error) {
      console.error("Forecast error:", error);
    }
  };

  const fetchMonthWiseExpenses = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/ml/monthly-expense");
      setMonthWiseExpenses(res.data);
    } catch (error) {
      console.error("Month-wise fetch error:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchForecast();
    fetchMonthWiseExpenses();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="ML Features">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(
              Number((dashboardData?.totalBalance || 0).toFixed(2))
            )}
            color="bg-indigo-600"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(
              Number((dashboardData?.totalIncome || 0).toFixed(2))
            )}
            color="bg-emerald-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(
              Number((dashboardData?.totalExpense || 0).toFixed(2))
            )}
            color="bg-rose-500"
          />
          {/* <InfoCard
            icon={<TbChartHistogram />}
            label="Forecast (Next Month)"
            value={forecast !== null ? `${addThousandsSeparator(forecast.toFixed(2))}` : "Loading..."}
            color="bg-yellow-500"
          /> */}
        </div>

        <div className="mt-8 mx-auto space-y-10 bg-[var(--color-secondary)] px-6 py-4 rounded-lg shadow-md shadow-black/10 border border-gray-700">
          {/* Title Section */}
          <div className="flex items-center gap-2 mb-4 justify-center">
            <TbChartHistogram className="text-xl text-yellow-500" />
            <h3 className="text-2xl font-semibold text-white">
              Expense Prediction
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column – Month-wise Expenses */}
            <div className="bg-[#2A2A2A] rounded-xl shadow p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-4 justify-center">
                <TbCalendarTime className="text-xl text-indigo-400" />
                <h3 className="text-lg font-semibold text-white">
                  Month-wise Expenses
                </h3>
              </div>

              {monthWiseExpenses.length > 0 ? (
                monthWiseExpenses.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-gray-300 py-2 border-b border-gray-600"
                  >
                    <span>{item.month}</span>
                    <span>
                      ₹ {addThousandsSeparator(item.total.toFixed(2))}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No expenses found.</p>
              )}
            </div>

            {/* Right Column – Forecast Result */}
            <div className="bg-[#2A2A2A] rounded-xl shadow p-4 flex flex-col items-center border border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <BsRobot className="text-xl text-blue-400" />
                <h3 className="text-lg font-semibold text-white">
                  Forecast: Next Month Expense
                </h3>
              </div>
              <p className="text-4xl font-bold text-orange-400">
                ₹{" "}
                {forecast !== null
                  ? addThousandsSeparator(forecast.toFixed(2))
                  : "Loading..."}
              </p>
              <p className="text-gray-400 mt-4 text-sm text-center">
                Based on your past expense patterns, this is the expected amount
                you might spend next month.
              </p>
            </div>
          </div>

          {/* Bottom Section – Expense Reduction Advice */}
          {/* <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold mb-3">
              💡 Where You Can Reduce Expenses
            </h3>
            <p className="text-gray-600">
              {advice
                ? advice
                : "Generating suggestions from your expense history..."}
            </p>
          </div> */}
        </div>

        <div className="mt-8 mx-auto space-y-10 bg-[var(--color-secondary)] px-6 py-4 rounded-lg shadow-md shadow-black/10 border border-gray-700">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <TbBulb className="text-xl text-yellow-500" />
            <h3 className="text-2xl font-semibold text-white">
              ML Features Coming Soon!
            </h3>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
