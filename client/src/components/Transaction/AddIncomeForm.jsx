import React, { useState } from "react";
import Input from "../Input";
import EmojiPickerPopup from "../layouts/EmojiPickerPopup.jsx";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div className="bg-secondary shadow-md rounded-2xl p-6 space-y-4 border border-gray-700 text-white">
      {/* Emoji Picker */}
      <div className="flex justify-center">
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
      </div>

      {/* Input Fields */}
      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="0.00"
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      {/* Add Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onAddIncome(income)}
          className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:brightness-110 transition-shadow shadow-lg hover:shadow-purple-800"
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
