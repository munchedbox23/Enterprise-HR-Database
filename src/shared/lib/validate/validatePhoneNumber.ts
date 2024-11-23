function validatePhoneNumber(
  phone: string,
  existingPhones: string[]
): string | null {
  const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  if (!phoneRegex.test(phone)) {
    return "Введите корректный номер телефона в формате 000-000-0000";
  }
  if (existingPhones.includes(phone)) {
    return "Этот номер телефона уже используется";
  }
  return null;
}

export { validatePhoneNumber };
