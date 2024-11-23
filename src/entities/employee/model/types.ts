export type Employee = {
  IdСотрудника: number;
  КодОтдела: string;
  ФИО: string;
  Должность: number | string;
  Стаж?: string | number | null;
  КонтактныйТелефон: string;
  ЗаработнаяПлата?: number | bigint;
  УровеньОбразования: "среднее" | "высшее";
};

export type EmployeePosition = {
  КодДолжности: number;
  Название: string;
};

export type EmployeeValueTypes = [
  Employee['IdСотрудника'],
  Employee['КодОтдела'],
  Employee['ФИО'],
  Employee['Должность'],
  Employee['Стаж'],
  Employee['КонтактныйТелефон'],
  Employee['ЗаработнаяПлата'],
  Employee['УровеньОбразования']
];
