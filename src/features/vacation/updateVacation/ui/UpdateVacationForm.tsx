import { useUpdateVacationMutation, Vacation } from "@/entities/vacation";
import { useForm } from "@/shared/lib/hooks/useForm";
import { BaseForm } from "@/shared/ui/BaseForm";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useGetEmployeesQuery } from "@/entities/employee";
import { Input } from "@/shared/ui/Input";
import {
  validateStartDate,
  validateEndDate,
  validateVacationType,
} from "../../createVacataion/model/validateVacationForm";
import { useValidation } from "@/shared/lib/hooks/useValidate";

export const UpdateVacationForm = ({
  vacation,
  onSuccess,
}: {
  vacation: Vacation;
  onSuccess: () => void;
}) => {
  const { formState, handleChange } = useForm<Omit<Vacation, "НомерЗаписи">>({
    ...vacation,  
  });

  const [updateVacation, { isLoading }] = useUpdateVacationMutation();
  const { data: employees = [] } = useGetEmployeesQuery();

  const { errors, validateForm } = useValidation<
    Omit<Vacation, "НомерЗаписи" | "IdСотрудника">
  >({
    ДатаНачала: () => validateStartDate(formState.ДатаНачала),
    ДатаОкончания: () =>
      validateEndDate(formState.ДатаНачала, formState.ДатаОкончания),
    Тип: () => validateVacationType(formState.Тип),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await updateVacation({
        vacation: {
          ...formState,
          IdСотрудника: Number(formState.IdСотрудника),
        },
        id: vacation.НомерЗаписи.toString(),
      });
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseForm
      buttonText="Обновить отпуск"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <CustomSelect
        label="Сотрудник"
        name="IdСотрудника"
        value={formState.IdСотрудника?.toString() || ""}
        onChange={handleChange}
        options={employees.map((employee) => ({
          label: `${employee.ФИО} - ${employee.IdСотрудника}`,
          value: employee.IdСотрудника.toString(),
          key: employee.IdСотрудника.toString(),
        }))}
      />
      <Input
        type="date"
        label="Дата начала"
        name="ДатаНачала"
        value={formState.ДатаНачала}
        onChange={handleChange}
        fullWidth
        error={!!errors.ДатаНачала}
        helperText={errors.ДатаНачала}
      />
      <Input
        type="date"
        label="Дата окончания"
        name="ДатаОкончания"
        value={formState.ДатаОкончания}
        onChange={handleChange}
        fullWidth
        error={!!errors.ДатаОкончания}
        helperText={errors.ДатаОкончания}
      />
      <Input
        type="text"
        label="Тип отпуска"
        name="Тип"
        value={formState.Тип}
        onChange={handleChange}
        fullWidth
        error={!!errors.Тип}
        helperText={errors.Тип}
      />
    </BaseForm>
  );
};
