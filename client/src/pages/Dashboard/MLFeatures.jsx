import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import InfoCard from "../../components/Cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosinstance.js";
import { API_PATHS } from "../../utils/apiPaths";

export default function MLFeatures() {
  useUserAuth();
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
        console.log(response.data);
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
        </div>
        <div className="mt-16 p-4 bg-white rounded-lg shadow">
            <p className="text-gray-700 text-lg">
                This page is under construction. Please check back later for updates on ML features.
            </p>
        </div>


      </div>
    </DashboardLayout>
  );
}
