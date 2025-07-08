import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const addThousandsSeparator = (num) => {
  // Handle null/undefined/NaN cases first
  if (num == null || isNaN(num)) return "";

  // Convert to string and split parts
  const numStr = num.toString();
  const [integerPart, fractionalPart] = numStr.split(".");

  // Safely format the integer part
  if (!integerPart) return fractionalPart ? `.${fractionalPart}` : "";

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Handle fractional part if exists
  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
    date: moment(item?.date).format("Do MMM"), // Format date to "1st Jan"
  }));
  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item.date).format("Do MMM"),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  // Sort data by date
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Format data for chart
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"), // Fixed format (e.g., "1st Jan")
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
};