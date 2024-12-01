import { BaseForm } from "@/shared/ui/BaseForm";
import { useForm } from "@/shared/lib/hooks/useForm";
import { Input } from "@/shared/ui/Input";
import {
  StaffingRecord,
  useAddStaffingMutation,
  useGetDepartmentQuery,
} from "@/entities/staffing";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useGetEmployeesQuery } from "@/entities/employee";
import { validateNumberOfUnits, validateSalary } from "@/shared/lib/validate";
import { useValidation } from "@/shared/lib/hooks/useValidate";

export const CreateStaffingForm = ({
  onStaffingAdded,
  onStaffingAddedError,
}: {
  onStaffingAdded: () => void;
  onStaffingAddedError: () => void;
}) => {
  const { formState, handleChange } = useForm<
    Omit<StaffingRecord, "IdРасписания">
  >({
    КодОтдела: "",
    Должность: "",
    КоличествоЕдиниц: undefined,
    Оклад: 35000,
  });

  const { closeModal } = useModalContext();
  const [addStaffing, { isLoading }] = useAddStaffingMutation();
  const { data: departments = [] } = useGetDepartmentQuery();
  const { data: employees = [] } = useGetEmployeesQuery();

  const { errors, validateForm } = useValidation<
    Pick<StaffingRecord, "КоличествоЕдиниц" | "Оклад">
  >({
    КоличествоЕдиниц: (value) => validateNumberOfUnits(Number(value)),
    Оклад: (value) => validateSalary(Number(value)),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await addStaffing({
        ...formState,
        Оклад: Number(formState.Оклад),
        КоличествоЕдиниц: Number(formState.КоличествоЕдиниц),
      }).unwrap();
      onStaffingAdded();
    } catch (error) {
      onStaffingAddedError();
    }
  };

  return (
    <BaseForm
      buttonText="Создать расписание"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <CustomSelect
        label="Отдел"
        name="КодОтдела"
        options={
          departments?.map((department) => ({
            value: department.НазваниеОтдела.toString(),
            label: department.НазваниеОтдела,
            key: department.КодОтдела.toString(),
          })) || []
        }
        value={formState.КодОтдела || ""}
        onChange={handleChange}
      />
      <CustomSelect
        label="Должность"
        name="Должность"
        options={employees?.map((employee) => ({
          value: employee.Должность.toString(),
          label: employee.Должность.toString(),
          key: employee.Должность,
        }))}
        value={formState.Должность}
        onChange={handleChange}
      />
      <Input
        type="number"
        label="Количество единиц"
        name="КоличествоЕдиниц"
        value={formState.КоличествоЕдиниц}
        onChange={handleChange}
        inputProps={{ min: 1 }}
        fullWidth
        error={!!errors.КоличествоЕдиниц}
        helperText={errors.КоличествоЕдиниц}
      />
      <Input
        type="number"
        label="Оклад"
        name="Оклад"
        value={formState.Оклад}
        onChange={handleChange}
        inputProps={{ min: 1 }}
        fullWidth
        error={!!errors.Оклад}
        helperText={errors.Оклад}
      />
    </BaseForm>
  );
};
