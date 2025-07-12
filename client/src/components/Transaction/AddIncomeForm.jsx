import React, {useState} from "react";
import Input from "../Input";
import EmojiPickerPopup from "../layouts/EmojiPickerPopup.jsx";

const AddIncomeForm = ({onAddIncome}) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({...income, [key]: value});

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
      <div className="flex justify-center">
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
      </div>

      <Input
        value={income.source}
        onChange={({target}) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
        className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
      />

      <Input
        value={income.amount}
        onChange={({target}) => handleChange("amount", target.value)}
        label="Amount"
        className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="0.00"
        type="number"
      />
      <Input
        value={income.date}
        onChange={({target}) => handleChange("date", target.value)}
        label="Date"
        className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        type="date"
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onAddIncome(income)}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold hover:from-green-500 hover:to-blue-600 transition-shadow shadow-md hover:shadow-lg"
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;