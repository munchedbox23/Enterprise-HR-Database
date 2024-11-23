import { Employee } from "@/entities/employee";
import { useForm } from "@/shared/lib/hooks/useForm";
import { BaseForm } from "@/shared/ui/BaseForm";
import { Input } from "@/shared/ui/Input";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";
import { SalaryRecord, useAddSalaryMutation } from "@/entities/salary";
import { useGetEmployeesQuery } from "@/entities/employee";

export const CreateSalaryForm = ({
  onSalaryAdded,
}: {
  onSalaryAdded: () => void;
}) => {
  const { formState, handleChange } = useForm<
    Omit<SalaryRecord, "НомерЗаписи">
  >({
    IdСотрудника: undefined,
    ДатаВыплаты: "",
    Сумма: undefined,
    ТипВыплаты: "Заработная плата",
  });

  const { closeModal } = useModalContext();
  const { data: employees = [] } = useGetEmployeesQuery();
  const [addSalary, { isLoading }] = useAddSalaryMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addSalary({
      ...formState,
      IdСотрудника: Number(formState.IdСотрудника),
      Сумма: Number(formState.Сумма),
    });
    closeModal();
    onSalaryAdded();
  };

  return (
    <BaseForm
      buttonText="Создать выплату"
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
        name="ДатаВыплаты"
        value={formState.ДатаВыплаты}
        onChange={handleChange}
        fullWidth
      />
      <Input
        type="number"
        label="Сумма"
        name="Сумма"
        value={formState.Сумма?.toString() || ""}
        onChange={handleChange}
        inputProps={{ min: 0 }}
        fullWidth
      />
      <Input
        type="text"
        label="Тип выплаты"
        name="ТипВыплаты"
        value={formState.ТипВыплаты}
        onChange={handleChange}
        fullWidth
      />
    </BaseForm>
  );
};
