function validateAmount(amount: string, paymentType?: string): string | null {
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return "Сумма должна быть положительным числом";
  }
  
  if (paymentType === "Заработная плата" && parsedAmount < 19242) {
    return "Заработная плата не может быть меньше МРОТ (19 242 руб.)";
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
