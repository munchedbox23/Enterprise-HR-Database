function validateDepartmentName(departmentName: string): string | null {
  return departmentName.trim().length > 0
    ? null
    : "Введите корректное название отдела";
}

export { validateDepartmentName };
