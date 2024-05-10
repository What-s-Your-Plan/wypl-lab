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
  return `${date.getFullYear()}-${padding0(date.getMonth() + 1)}-${padding0(date.getDate())}`;
}

function dateTimeToString(date: Date): string {
  return `${date.getFullYear()}-${padding0(date.getMonth() + 1)}-${padding0(date.getDate())}T${padding0(date.getHours())}:${padding0(date.getMinutes())}`;
}

function stringToDate(str: string): Date {
  return new Date(str);
}

function padding0(num: number) {
  return num.toString().padStart(2, '0');
}

function getDateDiff(d1: Date | string, d2: Date | string) {
  if (typeof d1 === 'string') {
    const sToD1 = stringToDate(d1);
    d1 = new Date(sToD1.getFullYear(), sToD1.getMonth(), sToD1.getDate());
  } else {
    d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  }

  if (typeof d2 === 'string') {
    const sToD2 = stringToDate(d2);
    d2 = new Date(sToD2.getFullYear(), sToD2.getMonth(), sToD2.getDate());
  } else {
    d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
  }
  return Math.abs((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));
}

function splitTTime(date: string) {
  const result = date.split('T');
  return result[0] + ' ' + result[1].slice(0, result[1].length - 3);
}

function isAllday(start: Date, end: Date): boolean {
  return (
    start.getHours() === 0 &&
    start.getMinutes() === 0 &&
    end.getHours() === 23 &&
    end.getMinutes() === 59
  );
}

export {
  isCurrentMonth,
  isSameDay,
  dateToString,
  dateTimeToString,
  stringToDate,
  padding0,
  getDateDiff,
  splitTTime,
  isAllday,
};
