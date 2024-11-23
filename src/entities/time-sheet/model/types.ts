export interface TimeSheetRecord {
  НомерЗаписи: number;
  IdСотрудника?: number;
  Дата: string;
  КоличествоОтработанныхЧасов: string | number;
}

export type TimeSheetValueTypes = [
  TimeSheetRecord["НомерЗаписи"],
  TimeSheetRecord["IdСотрудника"],
  TimeSheetRecord["Дата"],
  TimeSheetRecord["КоличествоОтработанныхЧасов"],
];
