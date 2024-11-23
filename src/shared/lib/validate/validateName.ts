export const validateName = (name: string): string | null => {
  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ0-9 _-]{3,50}$/;
  return nameRegex.test(name)
    ? null
    : "Имя должно содержать от 3 до 50 символов и может включать буквы, цифры, пробелы, _ и -";
};
