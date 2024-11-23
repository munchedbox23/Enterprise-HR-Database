function validatePaymentDate(date: string): string | null {
  const selectedDate = new Date(date);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (selectedDate > currentDate) {
    return "Дата выплаты не может быть в будущем";
  }
  return null;
}

function validateAmount(amount: string): string | null {
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return "Сумма должна быть положительным числом";
  }
  return null;
}

export { validatePaymentDate, validateAmount };
