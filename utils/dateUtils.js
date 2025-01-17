import {
  format,
  addMonths,
  startOfMonth,
  getMonth,
  parse,
  compareAsc,
  isAfter,
  isBefore,
  isEqual,
  startOfDay,
} from "date-fns";
import { es } from "date-fns/locale";

export function getMonthWithOffset(offset) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const newMonth = (currentMonth + offset) % 12;
  const adjustedMonth = newMonth < 0 ? 12 + newMonth : newMonth;
  return adjustedMonth + 1;
}

export function getFormattedFirstDayOfMonth(
  date,
  add,
  dateFormat = "d MMM. yyyy"
) {
  const nextMonth = addMonths(date, add);

  const firstDayNextMonth = startOfMonth(nextMonth);

  const formattedDateFirstMonth = format(firstDayNextMonth, dateFormat, {
    locale: es,
  });

  return formattedDateFirstMonth;
}

export function generateMonthDays(month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonthAndYear =
    today.getFullYear() === year && today.getMonth() === month;

  const days = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const weekDay = date.getDay();

    days.push({
      id: date.toString(),
      value: day,
      date: date,
      key: weekDay,
      active: isCurrentMonthAndYear ? day >= today.getDate() : true,
      isLastDayOfWeek: weekDay === 6, // If the day is Saturday, it's the last day of the week
    });
  }

  return days;
}

export function calculateFutureDate(offset) {
  const currentDate = new Date();

  currentDate.setMonth(currentDate.getMonth() + offset);

  currentDate.setDate(1);

  return currentDate;
}

export function getNext12Months() {
  const currentDate = new Date();
  const next12Months = [];

  for (let i = 0; i < 12; i++) {
    const newDate = addMonths(currentDate, i);
    const nameMonth = format(newDate, "MMMM", {
      locale: es,
    });
    const year = format(newDate, "yyyy", {
      locale: es,
    });
    const shortName = format(newDate, "MMM", {
      locale: es,
    });

    next12Months.push({
      id: i,
      date: newDate,
      name: nameMonth,
      shortName,
      year,
    });
  }

  return next12Months;
}

export function getDateFromMonth(month, year = "2024") {
  const selectedYear = year || new Date().getFullYear();

  const date = new Date(selectedYear, month, 1);

  return date;
}

export function formatMonthDate(date, formatDate = "d MMM. yyyy") {
  return format(date, formatDate, { locale: es });
}

export function getNextYear() {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  return nextYear;
}

export function sortDates(data) {
  const dateFormat = "EEE MMM dd yyyy HH:mm:ss 'GMT'xxxx (zzz)";

  return data.sort((a, b) => {
    const dateA = parse(a.date, dateFormat, new Date());
    const dateB = parse(b.date, dateFormat, new Date());
    return compareAsc(dateA, dateB);
  });
}

export function getYearAfterMonths(months) {
  if (months < 1 || months > 12) {
    throw new Error("El número de meses debe estar entre 1 y 12.");
  }

  const currentDate = new Date();
  const futureDate = addMonths(currentDate, months);
  return futureDate.getFullYear();
}

export function compareDates(
  date1,
  date2,
  { ignoreTime = false, comparisonType = "equal" } = {}
) {
  if (ignoreTime) {
    date1 = startOfDay(date1);
    date2 = startOfDay(date2);
  }

  const operations = {
    after: isAfter,
    before: isBefore,
    equal: isEqual,
  };

  const compareFn = operations[comparisonType];

  if (!compareFn) {
    throw new Error(`Tipo de comparación no soportado: ${comparisonType}`);
  }

  return compareFn(date1, date2);
}
