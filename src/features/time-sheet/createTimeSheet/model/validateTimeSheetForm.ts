function getMaxMonthHours(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return daysInMonth * 12; // Максимальное количество часов в месяце
}

async function validateTotalMonthHours(
  hours: number,
  date: string,
  employeeId: number
): Promise<string | null> {
  try {
    const selectedDate = new Date(date);
    const startOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );

    // Здесь должен быть запрос к API для получения существующих часов сотрудника за месяц
    const existingHours = 0; // Замените на реальный запрос к API

    const totalHours = existingHours + hours;
    const maxHours = getMaxMonthHours(selectedDate);

    if (totalHours > maxHours) {
      return `Общее количество часов в месяце не может превышать ${maxHours}`;
    }
    return null;
  } catch (error) {
    return "Ошибка при проверке общего количества часов";
  }
}

function validateWorkedHours(hours: string | number): string | null {
  if (hours === "" || hours === undefined) {
    return "Количество отработанных часов не может быть пустым";
  }
  const parsedHours = Number(hours);
  if (!Number.isInteger(parsedHours) || parsedHours < 0) {
    return "Количество отработанных часов должно быть целым числом больше или равно 0";
  }
  return null;
}

function validateDate(date: string): string | null {
  const selectedDate = new Date(date);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  if (selectedDate > currentDate) {
    return "Дата не может быть в будущем";
  }
  return null;
}

export { validateWorkedHours, validateDate, validateTotalMonthHours };
