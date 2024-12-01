import {
  TimeSheetRecord,
  TimeSheetValueTypes,
  useUpdateTimeSheetMutation,
} from "@/entities/time-sheet";
import { useForm } from "@/shared/lib/hooks/useForm";
import { BaseForm } from "@/shared/ui/BaseForm";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { Input } from "@/shared/ui/Input";
import { useGetEmployeesQuery } from "@/entities/employee";
import { useValidation } from "@/shared/lib/hooks/useValidate";
import {
  validateWorkedHours,
  validateDate,
} from "../../createTimeSheet/model/validateTimeSheetForm";

export const UpdateTimeSheetForm = ({
  timeSheet,
  onSuccess,
  onTimeSheetUpdatedError,
}: {
  timeSheet: TimeSheetValueTypes;
  onSuccess: () => void;
  onTimeSheetUpdatedError: () => void;
}) => {
  const { formState, handleChange } = useForm<
    Omit<TimeSheetRecord, "НомерЗаписи">
  >({
    IdСотрудника: timeSheet[1],
    Дата: timeSheet[2],
    КоличествоОтработанныхЧасов: timeSheet[3],
  });

  const [updateTimeSheet, { isLoading }] = useUpdateTimeSheetMutation();
  const { data: employees = [] } = useGetEmployeesQuery();

  const { errors, validateForm } = useValidation<
    Omit<TimeSheetRecord, "НомерЗаписи" | "IdСотрудника">
  >({
    Дата: () => validateDate(formState.Дата),
    КоличествоОтработанныхЧасов: () =>
      validateWorkedHours(formState.КоличествоОтработанныхЧасов),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await updateTimeSheet({
        timeSheet: {
          ...formState,
          IdСотрудника: Number(formState.IdСотрудника),
          КоличествоОтработанныхЧасов: Number(
            formState.КоличествоОтработанныхЧасов
          ),
        },
        id: timeSheet[0].toString(),
      }).unwrap();
      onSuccess();
    } catch (error) {
      onTimeSheetUpdatedError();
    }
  };

  return (
    <BaseForm
      buttonText="Обновить запись в табеле"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <CustomSelect
        label="Сотрудник"
        name="IdСотрудника"
        value={formState.IdСотрудника?.toString() || ""}
        onChange={handleChange}
        options={employees.map((employee) => ({
          label: `${employee.ФИО} - ${employee.IdСотрудника}`,
          value: employee.IdСотрудника.toString(),
          key: employee.IdСотрудника,
        }))}
      />
      <Input
        type="date"
        label=""
        name="Дата"
        value={formState.Дата}
        onChange={handleChange}
        fullWidth
        error={!!errors.Дата}
        helperText={errors.Дата}
      />
      <Input
        type="number"
        label="Количество отработанных часов"
        name="КоличествоОтработанныхЧасов"
        value={formState.КоличествоОтработанныхЧасов}
        onChange={handleChange}
        inputProps={{ min: 1, max: 180 }}
        fullWidth
        error={!!errors.КоличествоОтработанныхЧасов}
        helperText={errors.КоличествоОтработанныхЧасов}
      />
    </BaseForm>
  );
};
