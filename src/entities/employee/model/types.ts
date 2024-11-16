export type Employee = {
  IdСотрудника: number;
  КодОтдела: string;
  ФИО: string;
  Должность: number | string;
  Стаж?: string | number | null;
  КонтактныйТелефон: string;
  ЗаработнаяПлата: number | bigint;
  УровеньОбразования:
    | "среднее"
    | "высшее"
    | "неоконченное высшее"
    | "среднее специальное"
    | "профессиональное"
    | "";
};

export type EmployeePosition = {
  КодДолжности: number;
  Название: string;
};
