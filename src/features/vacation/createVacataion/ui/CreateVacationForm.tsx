import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";
import {
  useAddVacationMutation,
  useGetVacationsQuery,
  Vacation,
} from "@/entities/vacation";
import { useForm } from "@/shared/lib/hooks/useForm";
import { BaseForm } from "@/shared/ui/BaseForm";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useGetEmployeesQuery } from "@/entities/employee";
import { Input } from "@/shared/ui/Input";
import {
  validateStartDate,
  validateEndDate,
  validateVacationType,
  validateVacationDuration,
} from "../model/validateVacationForm";
import { useValidation } from "@/shared/lib/hooks/useValidate";

export const CreateVacationForm = ({
  onSuccess,
  onVacationAddedError,
}: {
  onSuccess: () => void;
  onVacationAddedError: () => void;
}) => {
  const { formState, handleChange } = useForm<Omit<Vacation, "НомерЗаписи">>({
    IdСотрудника: undefined,
    ДатаНачала: new Date().toISOString().split("T")[0],
    ДатаОкончания: "",
    Тип: "",
  });
  const [addVacation, { isLoading }] = useAddVacationMutation();
  const { data: employees = [] } = useGetEmployeesQuery();
  const { closeModal } = useModalContext();
  const { data: vacations = [] } = useGetVacationsQuery();

  const { errors, validateForm, setErrors } = useValidation<
    Omit<Vacation, "НомерЗаписи" | "IdСотрудника">
  >({
    ДатаНачала: () => validateStartDate(formState.ДатаНачала),
    ДатаОкончания: () => {
      const endDateError = validateEndDate(formState.ДатаНачала, formState.ДатаОкончания);
      if (endDateError) return endDateError;

      return validateVacationDuration(formState.ДатаНачала, formState.ДатаОкончания);
    },
    Тип: () => validateVacationType(formState.Тип),
  });

  const isVacationOverlap = (
    startDate: string,
    endDate: string,
    employeeId: number
  ): boolean => {
    if (!employeeId) return false;

    return vacations.some(
      (vacation) =>
        vacation.IdСотрудника === employeeId &&
        new Date(vacation.ДатаНачала) <= new Date(endDate) &&
        new Date(vacation.ДатаОкончания) >= new Date(startDate)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasOverlap = isVacationOverlap(
      formState.ДатаНачала,
      formState.ДатаОкончания,
      Number(formState.IdСотрудника)
    );

    if (hasOverlap) {
      setErrors({
        ...errors,
        ДатаНачала: "Сотрудник уже находится в отпуске в этот период",
      });
      return;
    }

    if (!validateForm(formState)) return;

    try {
      await addVacation({
        ...formState,
        IdСотрудника: Number(formState.IdСотрудника),
      }).unwrap();
      closeModal();
      onSuccess();
    } catch (error) {
      onVacationAddedError();
    }
  };

  return (
    <BaseForm
      buttonText="Создать отпуск"
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
          value: employee.IdСотрудника.toString() || "",
          key: employee.IdСотрудника.toString(),
        }))}
      />
      <Input
        type="date"
        label=""
        name="ДатаНачала"
        value={formState.ДатаНачала}
        onChange={handleChange}
        fullWidth
        error={!!errors.ДатаНачала}
        helperText={errors.ДатаНачала}
      />
      <Input
        type="date"
        label=""
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
