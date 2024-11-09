export const getDateValue = (d: number) => d.toString().padStart(2, '0');

export const parseDateTime = (date: string, time: string): Date => {
  if (!date || !time) return new Date();
  const [day, month, year] = date.split('/').map(Number);
  const [hrs, minutes, seconds] = time.split(':').map(Number);
  const dateTime = new Date(
    Date.UTC(year, month - 1, day, hrs, minutes, seconds)
  );

  return dateTime;
};
