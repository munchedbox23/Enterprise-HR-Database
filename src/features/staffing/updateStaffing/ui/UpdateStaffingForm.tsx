import { BaseForm } from "@/shared/ui/BaseForm";
import { useForm } from "@/shared/lib/hooks/useForm";
import { Input } from "@/shared/ui/Input";
import {
  StaffingValueTypes,
  useUpdateStaffingMutation,
  useGetDepartmentQuery,
  StaffingRecord,
} from "@/entities/staffing";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useGetEmployeesQuery } from "@/entities/employee";
import { validateNumberOfUnits, validateSalary } from "@/shared/lib/validate";
import { useValidation } from "@/shared/lib/hooks/useValidate";

export const UpdateStaffingForm = ({
  staffingRecord,
  onStaffingUpdated,
  onStaffingUpdatedError,
}: {
  staffingRecord: StaffingValueTypes;
  onStaffingUpdated: () => void;
  onStaffingUpdatedError: () => void;
}) => {
  const { formState, handleChange } = useForm<
    Omit<StaffingRecord, "IdРасписания">
  >({
    КодОтдела: staffingRecord[1],
    Должность: staffingRecord[2],
    КоличествоЕдиниц: staffingRecord[3],
    Оклад: staffingRecord[4],
  });

  const { errors, validateForm } = useValidation<
    Pick<StaffingRecord, "КоличествоЕдиниц" | "Оклад">
  >({
    КоличествоЕдиниц: (value) => validateNumberOfUnits(Number(value)),
    Оклад: (value) => validateSalary(Number(value)),
  });

  const [updateStaffing, { isLoading }] = useUpdateStaffingMutation();
  const { data: departments = [] } = useGetDepartmentQuery();
  const { data: employees = [] } = useGetEmployeesQuery();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm(formState)) return;

    try {
      await updateStaffing({
        staffing: {
          ...formState,
          Оклад: Number(formState.Оклад),
          КоличествоЕдиниц: Number(formState.КоличествоЕдиниц),
        },
        id: staffingRecord[0].toString(),
      }).unwrap();
      onStaffingUpdated();
    } catch (error) {
      onStaffingUpdatedError();
    }
  };

  return (
    <BaseForm
      buttonText="Обновить расписание"
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
        value={
          employees?.some(
            (employee) => employee.Должность === formState.Должность
          )
            ? formState.Должность
            : ""
        }
        onChange={handleChange}
      />
      <Input
        type="number"
        label="Количество единиц"
        name="КоличествоЕдиниц"
        value={formState.КоличествоЕдиниц}
        onChange={handleChange}
        inputProps={{ min: 1, max: 2 }}
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
