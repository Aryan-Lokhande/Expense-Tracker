import React, { useState } from "react";
import Input from "../Input";
import EmojiPickerPopup from "../layouts/EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setIncome({
      ...income,
      [key]: value,
    });

  return (
    <div className="bg-secondary text-white border border-gray-700 shadow-md rounded-2xl p-6 space-y-4">
      {/* Emoji Picker */}
      <div className="flex justify-center">
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
      </div>

      {/* Input Fields */}
      <Input
        value={income.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc"
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

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onAddExpense(income)}
          className="px-6 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-semibold transition-shadow shadow-lg hover:shadow-pink-800"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
