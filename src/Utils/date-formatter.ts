export const dateFormatter = (
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
) => {
  return Intl.DateTimeFormat("id-ID", {
    ...options,
    timeZone: "Asia/Jakarta",
  }).format(new Date(date));
};
