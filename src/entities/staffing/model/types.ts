export interface StaffingRecord {
  IdРасписания: number;
  КодОтдела: string;
  Должность: string;
  КоличествоЕдиниц: number;
  Оклад: number | bigint;
}

export interface DepartmentRecord {
  КодОтдела: number;
  НазваниеОтдела: string;
  КонтактныйТелефон: string;
}
