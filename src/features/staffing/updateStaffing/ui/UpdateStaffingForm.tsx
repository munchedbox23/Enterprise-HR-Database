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

export const UpdateStaffingForm = ({
  staffingRecord,
  onStaffingUpdated,
}: {
  staffingRecord: StaffingValueTypes;
  onStaffingUpdated: () => void;
}) => {
  const { formState, handleChange } = useForm<
    Omit<StaffingRecord, "IdРасписания">
  >({
    КодОтдела: staffingRecord[1],
    Должность: staffingRecord[2],
    КоличествоЕдиниц: staffingRecord[3],
    Оклад: staffingRecord[4],
  });

  const [updateStaffing, { isLoading }] = useUpdateStaffingMutation();
  const { data: departments = [] } = useGetDepartmentQuery();
  const { data: employees = [] } = useGetEmployeesQuery();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateStaffing({
      staffing: {
        ...formState,
        Оклад: Number(formState.Оклад),
        КоличествоЕдиниц: Number(formState.КоличествоЕдиниц),
      },
      id: staffingRecord[0].toString(),
    });
    onStaffingUpdated();
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
        inputProps={{ min: 1 }}
        fullWidth
      />
      <Input
        type="number"
        label="Оклад"
        name="Оклад"
        value={formState.Оклад}
        onChange={handleChange}
        inputProps={{ min: 1 }}
        fullWidth
      />
    </BaseForm>
  );
};
