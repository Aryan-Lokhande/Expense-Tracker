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
