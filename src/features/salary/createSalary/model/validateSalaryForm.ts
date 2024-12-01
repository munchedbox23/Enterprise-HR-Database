function validateAmount(amount: string): string | null {
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return "Сумма должна быть положительным числом";
  }
  return null;
}

function validatePaymentType(type: string): string | null {
  if (!type) {
    return "Тип выплаты не может быть пустым";
  }
  return null;
}

function validatePaymentDate(date: string): string | null {
  if (!date) {
    return "Дата не может быть пустой";
  }
  const paymentDate = new Date(date);
  const currentDate = new Date();
  return paymentDate <= currentDate
    ? null
    : "Дата выплаты не может быть в будущем";
}
export { validatePaymentDate, validateAmount, validatePaymentType };
