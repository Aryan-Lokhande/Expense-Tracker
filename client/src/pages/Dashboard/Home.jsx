import React, {useEffect, useState} from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import {useUserAuth} from "../../hooks/useUserAuth";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";

import {LuHandCoins, LuWalletMinimal} from "react-icons/lu";
import {IoMdCard} from "react-icons/io";
import {addThousandsSeparator} from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions.jsx";
import FinanceOverview from "../../components/Dashboard/FinanceOverview.jsx";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions.jsx";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses.jsx";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart.jsx";
import RecentIncome from "../../components/Dashboard/RecentIncome.jsx";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
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
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={Number((dashboardData?.totalBalance || 0).toFixed(2))}
            totalIncome={Number((dashboardData?.totalIncome || 0).toFixed(2))}
            totalExpense={Number(
              (dashboardData?.totalExpense || 0).toFixed(2)
            )}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />
          <RecentIncomeWithChart
            data={
              dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
            }
            totalIncome={Number((dashboardData?.totalIncome || 0).toFixed(2))}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div> 
      </div>
    </DashboardLayout>
  );
};

export default Home;