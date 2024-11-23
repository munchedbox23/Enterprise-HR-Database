import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";
import { useAddVacationMutation, Vacation } from "@/entities/vacation";
import { useForm } from "@/shared/lib/hooks/useForm";
import { BaseForm } from "@/shared/ui/BaseForm";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useGetEmployeesQuery } from "@/entities/employee";
import { Input } from "@/shared/ui/Input";

export const CreateVacationForm = ({
  onSuccess,
}: {
  onSuccess: () => void;
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addVacation({
        ...formState,
        IdСотрудника: Number(formState.IdСотрудника),
      });
      closeModal();
    } catch (error) {
      console.log(error);
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
      />
      <Input
        type="date"
        label=""
        name="ДатаОкончания"
        value={formState.ДатаОкончания}
        onChange={handleChange}
        fullWidth
      />
      <Input
        type="text"
        label=""
        name="Тип"
        value={formState.Тип}
        onChange={handleChange}
        fullWidth
      />
    </BaseForm>
  );
};
