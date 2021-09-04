export const formatDate = (
  date: string | number | Date,
  locale: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
) => {
  return new Date(date).toLocaleDateString(locale, options);
};
