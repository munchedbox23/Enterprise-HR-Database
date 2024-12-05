function validatePosition(position: string | number): string | null {
  if (typeof position === "string" && position.trim().length > 2) {
    return null;
  }
  if (typeof position === "number" && position > 0) {
    return null;
  }
  return "Введите корректную должность";
}

function validateExperience(
  experience: string | number | undefined
): string | null {
  const exp =
    typeof experience === "string" ? parseInt(experience, 10) : experience;
  return exp === undefined || (Number.isInteger(exp) && exp >= 0)
    ? null
    : "Введите корректный опыт работы";
}

function validatePhoneNumber(phone: string): string | null {
  const phoneRegex = /^[0-9]{11}$/;
  return phoneRegex.test(phone) ? null : "Введите корректный номер телефона";
}
function validateSalary(amount: string, paymentType?: string): string | null {
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return "Сумма должна быть положительным числом";
  }

  if (paymentType === "Заработная плата" && parsedAmount < 19242) {
    return "Заработная плата не может быть меньше МРОТ (19 242 руб.)";
  }

  return null;
}
function validateEducationLevel(level: string): string | null {
  const validLevels = ["среднее", "высшее"];
  return validLevels.includes(level)
    ? null
    : "Введите корректный уровень образования";
}

function validateFullName(fullName: string): string | null {
  if (!fullName) {
    return "ФИО не может быть пустым.";
  }
  if (fullName.length < 3) {
    return "ФИО должно содержать не менее 3 символов.";
  }
  if (!/^[а-яА-ЯёЁ\s]+$/.test(fullName)) {
    return "ФИО должно содержать только русские буквы и пробелы.";
  }
  return null;
}

export {
  validatePosition,
  validateExperience,
  validatePhoneNumber,
  validateSalary,
  validateEducationLevel,
  validateFullName,
};
