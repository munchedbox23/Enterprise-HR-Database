function validateDate(date: string): string | null {
  const currentDate = new Date().toISOString().split("T")[0];
  return date >= currentDate ? null : "Дата должна быть в будущем";
}

function validateEventType(type: string): string | null {
  return type.trim().length > 0 ? null : "Введите корректный тип события";
}

export { validateDate, validateEventType };
