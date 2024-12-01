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

export { validateWorkedHours, validateDate };
