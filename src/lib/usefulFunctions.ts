export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
};
