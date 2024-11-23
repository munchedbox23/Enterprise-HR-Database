export interface Event {
  НомерСобытия: number;
  IdСотрудника?: number;
  ДатаСобытия: string;
  ТипСобытия: string;
  Комментарий: string;
}

export type EventValueTypes = [
  Event["НомерСобытия"],
  Event["IdСотрудника"],
  Event["ДатаСобытия"],
  Event["ТипСобытия"],
  Event["Комментарий"]
];
