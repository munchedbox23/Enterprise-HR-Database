import { useForm } from "@/shared/lib/hooks/useForm";
import { BaseForm } from "@/shared/ui/BaseForm";
import { Input } from "@/shared/ui/Input";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useGetEmployeesQuery } from "@/entities/employee";
import { SalaryRecord, useUpdateSalaryMutation } from "@/entities/salary";
import {
  validatePaymentDate,
  validateAmount,
  validatePaymentType,
} from "../../createSalary/model/validateSalaryForm";
import { useValidation } from "@/shared/lib/hooks/useValidate";

export const UpdateSalaryForm = ({
  salary,
  onSuccess,
  onSalaryUpdatedError,
}: {
  salary: SalaryRecord;
  onSuccess: () => void;
  onSalaryUpdatedError: () => void;
}) => {
  const { formState, handleChange } = useForm<
    Omit<SalaryRecord, "НомерЗаписи">
  >({
    ...salary,
  });

  const { data: employees = [] } = useGetEmployeesQuery();
  const [updateSalary, { isLoading }] = useUpdateSalaryMutation();

  const { errors, validateForm } = useValidation<
    Omit<SalaryRecord, "НомерЗаписи" | "IdСотрудника">
  >({
    ДатаВыплаты: () => validatePaymentDate(formState.ДатаВыплаты),
    Сумма: () =>
      validateAmount(formState.Сумма?.toString() || "", formState.ТипВыплаты),
    ТипВыплаты: () => validatePaymentType(formState.ТипВыплаты),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await updateSalary({
        salary: {
          ...formState,
          IdСотрудника: Number(formState.IdСотрудника),
          Сумма: Number(formState.Сумма),
        },
        id: salary.НомерЗаписи.toString(),
      }).unwrap();
      onSuccess();
    } catch (error) {
      onSalaryUpdatedError();
      console.log(error);
    }
  };

  return (
    <BaseForm
      buttonText="Обновить выплату"
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
        label="Дата выплаты"
        name="ДатаВыплаты"
        value={formState.ДатаВыплаты}
        onChange={handleChange}
        fullWidth
        error={!!errors.ДатаВыплаты}
        helperText={errors.ДатаВыплаты}
      />
      <Input
        type="number"
        label="Сумма"
        name="Сумма"
        value={formState.Сумма?.toString() || ""}
        onChange={handleChange}
        inputProps={{ min: 1 }}
        fullWidth
        error={!!errors.Сумма}
        helperText={errors.Сумма}
      />
      <Input
        type="text"
        label="Тип выплаты"
        name="ТипВыплаты"
        value={formState.ТипВыплаты}
        onChange={handleChange}
        fullWidth
        error={!!errors.ТипВыплаты}
        helperText={errors.ТипВыплаты}
      />
    </BaseForm>
  );
};
