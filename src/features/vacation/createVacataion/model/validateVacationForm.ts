function validateStartDate(startDate: string): string | null {
  const currentDate = new Date().toISOString().split("T")[0];
  return startDate >= currentDate
    ? null
    : "Дата начала не может быть в прошлом";
}

function validateEndDate(startDate: string, endDate: string): string | null {
  return endDate >= startDate
    ? null
    : "Дата окончания должна быть позже даты начала";
}

function validateVacationType(type: string): string | null {
  return type.trim().length > 0 ? null : "Введите корректный тип отпуска";
}

export { validateStartDate, validateEndDate, validateVacationType };
