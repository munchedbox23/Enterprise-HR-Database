export interface SalaryRecord {
  НомерЗаписи: number;
  IdСотрудника?: number;
  ДатаВыплаты: string;
  Сумма?: number | bigint;
  ТипВыплаты: string;
}
