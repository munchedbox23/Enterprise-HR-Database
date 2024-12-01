function validateNumberOfUnits(units: number): string | null {
  return Number.isInteger(units) && units > 0
    ? null
    : "Введите корректное количество единиц";
}

function validateSalary(salary: number): string | null {
  return typeof salary === "number" && salary > 0
    ? null
    : "Введите корректный оклад";
}

export { validateNumberOfUnits, validateSalary };
