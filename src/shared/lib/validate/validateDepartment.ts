export const validateDepartmentName = (
  name: string,
  existingDepartments: string[]
): string | null => {
  if (!name.trim()) {
    return "Название отдела обязательно";
  }
  if (existingDepartments.some((deptName) => deptName === name.trim())) {
    return "Отдел с таким названием уже существует";
  }
  return null;
};
