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

  data.forEach(({ amount, category, date }) => {
    const month = new Date(date).toLocaleString("default", { month: "long" });
    const key = `${category}-${month}`;

    if (!grouped[key]) {
      grouped[key] = {
        amount: 0,
        category,
        month,
      };
    }

    grouped[key].amount += amount;
  });

  // Properly return an array of objects
  const chartData = Object.keys(grouped).map((key) => {
    const { category, amount, month } = grouped[key];
    return {
      date: category,
      category,
      amount,
      month,
    };
  });

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const grouped = {};

  data.forEach(({ amount, source, date }) => {
    const month = new Date(date).toLocaleString("default", { month: "long" });
    const key = `${source}-${month}`;

    if (!grouped[key]) {
      grouped[key] = {
        amount: 0,
        source,
        month,
      };
    }

    grouped[key].amount += amount;
  });

  // Properly return an array of objects
  const chartData = Object.keys(grouped).map((key) => {
    const { source, amount, month } = grouped[key];
    return {
      date: source,
      category: source,
      amount,
      month,
    };
  });

  return chartData;
};


export const prepareExpenseLineChartData = (data = []) => {
  // Sort data by date
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Format data for chart
  const chartData = sortedData.map((item) => ({
    date: moment(item?.date).format("Do MMM"), // Fixed format (e.g., "1st Jan")
    month: moment(item?.date).format("MMMM"), // Full month name
    amount: item?.amount,
    category: item?.category,
    source: item?.source, // Added source for income data
  }));

  return chartData;
};

export const mergeDataByMonth = (dataObj) => {
  const dataArray = Object.values(dataObj);
  const merged = {};

  dataArray.forEach(({ date, amount, category, source }) => {
    let label=""; // Prefer category, fallback to source
    if (category) {
      label = category;
    } else if (source) {
      label = source;
    }
    // console.log("Label:", label);
    if (!merged[date]) {
      merged[date] = {
        date,
        amount,
        categories: [label],
      };
    } else {
      merged[date].amount += amount;
      merged[date].categories.push(label);
    }
  });

  // console.log("Merged Data:", merged);
  return Object.values(merged);
};

export const getUniqueMonthsFromData = (data) => {
  const monthSet = new Set();
  data.forEach((item) => {
    if (item.month) monthSet.add(item.month);
  });
  return Array.from(monthSet);
};