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

function validateSalary(salary: number): string | null {
  return typeof salary === "number" && salary > 0
    ? null
    : "Введите корректную зарплату";
}

function validateEducationLevel(level: string): string | null {
  const validLevels = ["среднее", "высшее"];
  return validLevels.includes(level)
    ? null
    : "Введите корректный уровень образования";
}

export {
  validatePosition,
  validateExperience,
  validatePhoneNumber,
  validateSalary,
  validateEducationLevel,
};
