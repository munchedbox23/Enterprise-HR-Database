function validateWorkedHours(hours: string | number): string | null {
  const parsedHours = Number(hours);
  if (!Number.isInteger(parsedHours) || parsedHours < 0) {
    return "Количество отработанных часов должно быть целым числом больше или равно 0";
  }
  return null;
}

function validateDate(date: string): string | null {
  const selectedDate = new Date(date);
  const currentDate = new Date();

  currentDate.setHours(0, 0, 0, 0);

  if (selectedDate >= currentDate) {
    return "Дата не может быть в будущем";
  }
  return null;
}

export { validateWorkedHours, validateDate };
