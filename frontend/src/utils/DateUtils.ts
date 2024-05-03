function isCurrentMonth(date: Date, currMonth: number): boolean {
  return date.getMonth() === currMonth;
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function dateToString(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function stringToDate(str: string): Date {
  const [year, month, day] = str.split('-');
  return new Date(Number(year), Number(month) - 1, Number(day));
}

function padding0(num: number) {
  return num.toString().padStart(2, '0');
}

export { isCurrentMonth, isSameDay, dateToString, stringToDate, padding0 };
