import {
  TimeSheetRecord,
  useAddTimeSheetMutation,
} from "@/entities/time-sheet";
import { useForm } from "@/shared/lib/hooks/useForm";
import { BaseForm } from "@/shared/ui/BaseForm";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { Input } from "@/shared/ui/Input";
import { useGetEmployeesQuery } from "@/entities/employee";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";
import {
  validateWorkedHours,
  validateDate,
  validateTotalMonthHours,
} from "../model/validateTimeSheetForm";
import { useValidation } from "@/shared/lib/hooks/useValidate";

export const CreateTimeSheetForm = ({
  onSuccess,
  onTimeSheetAddedError,
}: {
  onSuccess: () => void;
  onTimeSheetAddedError: () => void;
}) => {
  const { formState, handleChange } = useForm<
    Omit<TimeSheetRecord, "НомерЗаписи">
  >({
    IdСотрудника: undefined,
    Дата: new Date().toISOString().split("T")[0],
    КоличествоОтработанныхЧасов: "",
  });

  const [addTimeSheet, { isLoading }] = useAddTimeSheetMutation();
  const { data: employees = [] } = useGetEmployeesQuery();
  const { closeModal } = useModalContext();

  const { errors, validateForm, setErrors } = useValidation<
    Omit<TimeSheetRecord, "НомерЗаписи" | "Id">
  >({
    Дата: () => validateDate(formState.Дата),
    КоличествоОтработанныхЧасов: () =>
      validateWorkedHours(formState.КоличествоОтработанныхЧасов),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
    
    const monthHoursError = await validateTotalMonthHours(
      Number(formState.КоличествоОтработанныхЧасов),
      formState.Дата,
      Number(formState.IdСотрудника)
    );
    
    if (monthHoursError) {
      setErrors(prev => ({ ...prev, КоличествоОтработанныхЧасов: monthHoursError }));
      return;
    }

    try {
      await addTimeSheet({
        ...formState,
        IdСотрудника: Number(formState.IdСотрудника),
        КоличествоОтработанныхЧасов: Number(
          formState.КоличествоОтработанныхЧасов
        ),
      }).unwrap();
      onSuccess();
    } catch (error) {
      onTimeSheetAddedError();
    } finally {
      closeModal();
    }
  };

  return (
    <BaseForm
      buttonText="Создать запись в табеле"
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
        inputProps={{ min: 1 }}
        fullWidth
        error={!!errors.КоличествоОтработанныхЧасов}
        helperText={errors.КоличествоОтработанныхЧасов}
      />
    </BaseForm>
  );
};
