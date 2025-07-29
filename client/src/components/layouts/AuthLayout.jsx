import React from "react";
import pic from "../../assets/Images/card.png";
import { LuTrendingUpDown } from "react-icons/lu";

export default function AuthLayout({ children }) {
  return (
    <div className="flex bg-secondary text-white">
      {/* Left: Login/Signup */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-semibold text-white">Expense Tracker</h2>
        {children}
      </div>

      {/* Right: Auth Illustration & Stat */}
      <div className="hidden md:block w-[40vw] h-screen bg-secondary bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        {/* Colorful Overlays */}
        <div className="w-48 h-48 rounded-[40px] bg-accent absolute -top-7 -left-5 opacity-70" />
        <div className="w-48 h-48 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] right-[10px] opacity-60" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5 opacity-70" />

        {/* Card with Stat */}
        <div className="grid grid-cols-1 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track your income and expenses"
            value="56,000"
            color="bg-primary"
          />
        </div>

        {/* Image */}
        <img
          src={pic}
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-primary/10 rounded-lg"
        />
      </div>
    </div>
  );
}

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-[#2A2A2A] p-4 rounded-xl shadow-md shadow-purple-700/10 border border-gray-700 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-400 mb-1">{label}</h6>
        <span className="text-[20px] text-white">₹{value}</span>
      </div>
    </div>
  );
};
