export const formatDate = (date: any) => {
  if (!(date instanceof Date)) {
    // Try to parse it if it's a string or a number
    date = new Date(date);
  }

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
