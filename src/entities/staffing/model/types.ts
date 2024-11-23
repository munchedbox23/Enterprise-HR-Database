import { Employee } from "@/entities/employee";

export interface StaffingRecord {
  IdРасписания: number;
  КодОтдела: string;
  Должность: string;
  КоличествоЕдиниц?: number;
  Оклад: number | bigint;
}

export interface DepartmentRecord {
  КодОтдела: number;
  НазваниеОтдела: string;
  КонтактныйТелефон: string;
}

export type StaffingValueTypes = [
  StaffingRecord["IdРасписания"],
  StaffingRecord["КодОтдела"],
  StaffingRecord["Должность"],
  StaffingRecord["КоличествоЕдиниц"],
  StaffingRecord["Оклад"],
];

export type DepartmentValueTypes = [
  DepartmentRecord["КодОтдела"],
  DepartmentRecord["НазваниеОтдела"],
  DepartmentRecord["КонтактныйТелефон"],
];
