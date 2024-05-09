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
  const [year, month, day] = str.split(' ')[0].split('-');
  return new Date(Number(year), Number(month) - 1, Number(day));
}

function padding0(num: number) {
  return num.toString().padStart(2, '0');
}

function getDateDiff(d1: Date | string, d2: Date | string) {
  if (typeof d1 === 'string') {
    d1 = stringToDate(d1);
  } else {
    d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  }

  if (typeof d2 === 'string') {
    d2 = stringToDate(d2);
  } else {
    d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
  }
  return Math.abs((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));
}

function splitTTime(date: string) {
  const result = date.split('T');
  return result[0] + ' ' + result[1].slice(0, result[1].length - 3);
}

export {
  isCurrentMonth,
  isSameDay,
  dateToString,
  stringToDate,
  padding0,
  getDateDiff,
  splitTTime,
};
