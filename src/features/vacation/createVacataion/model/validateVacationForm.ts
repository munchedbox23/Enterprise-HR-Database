function validateStartDate(startDate: string): string | null {
  const currentDate = new Date().toISOString().split("T")[0];
  return startDate >= currentDate
    ? null
    : "Дата начала не может быть в прошлом";
}

function validateEndDate(startDate: string, endDate: string): string | null {
  return endDate >= startDate
    ? null
    : "Дата окончания должна быть позже даты начала или совпадать с ней";
}

function validateVacationType(type: string): string | null {
  return type.trim().length > 0 ? null : "Введите корректный тип отпуска";
}

function validateVacationDuration(startDate: string, endDate: string): string | null {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const durationInDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);

  return durationInDays <= 14
    ? null
    : "Отпуск не может превышать 14 дней";
}

export { validateStartDate, validateEndDate, validateVacationType, validateVacationDuration };
