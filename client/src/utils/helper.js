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

export const prepareExpenceBarChartData = (data = []) => {
  const grouped = {};

  data.forEach(({ amount, category }) => {
    if (!grouped[category]) {
      grouped[category] = 0;
    }
    grouped[category] += amount;
  });

  // console.log("Grouped Data:", grouped);

  // Properly return an array of objects, not a single object inside an array
  const chartData = Object.keys(grouped).map((category) => ({
    date: category,
    category: category,
    amount: grouped[category],
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const grouped = {};

  data.forEach(({ amount, source }) => {
    if (!grouped[source]) {
      grouped[source] = 0;
    }
    grouped[source] += amount;
  });

  // console.log("Grouped Data:", grouped);

  // Properly return an array of objects, not a single object inside an array
  const chartData = Object.keys(grouped).map((source) => ({
    date: source,
    category: source,
    amount: grouped[source],
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
    source: item?.source, // Added source for income data
  }));

  return chartData;
};

export const mergeDataByMonth = (dataObj) => {
  const dataArray = Object.values(dataObj);
  const merged = {};

  dataArray.forEach(({ month, amount, category, source }) => {
    let label=""; // Prefer category, fallback to source
    if (category) {
      label = category;
    } else if (source) {
      label = source;
    }
    // console.log("Label:", label);
    if (!merged[month]) {
      merged[month] = {
        month,
        amount,
        categories: [label],
      };
    } else {
      merged[month].amount += amount;
      merged[month].categories.push(label);
    }
  });

  // console.log("Merged Data:", merged);
  return Object.values(merged);
};
