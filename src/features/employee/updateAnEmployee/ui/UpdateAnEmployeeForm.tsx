import {
  Employee,
  EmployeeValueTypes,
  useUpdateEmployeeMutation,
} from "@/entities/employee";
import { useForm } from "@/shared/lib/hooks/useForm";
import { BaseForm } from "@/shared/ui/BaseForm";
import { Input } from "@/shared/ui/Input";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import MaskedInput from "react-text-mask";
import { useGetDepartmentQuery } from "@/entities/staffing";
import { useValidation } from "@/shared/lib/hooks/useValidate";
import {
  validateEducationLevel,
  validateExperience,
  validatePosition,
  validateSalary,
} from "../../createAnEmployee/model/lib/validateForm";
import { validatePhoneNumber } from "@/shared/lib/validate";
import { validateName } from "@/shared/lib/validate";

export const UpdateAnEmployeeForm = ({
  employee,
  onEmployeeUpdated,
}: {
  employee: EmployeeValueTypes;
  onEmployeeUpdated: () => void;
}) => {
  const [
    IdСотрудника,
    КодОтдела,
    ФИО,
    Должность,
    Стаж,
    КонтактныйТелефон,
    ЗаработнаяПлата,
    УровеньОбразования,
  ] = employee;

  const { formState, handleChange } = useForm<Omit<Employee, "IdСотрудника">>({
    КодОтдела,
    ФИО,
    Должность,
    Стаж,
    КонтактныйТелефон,
    ЗаработнаяПлата,
    УровеньОбразования,
  });
  const { data: departments } = useGetDepartmentQuery();
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  const { errors, validateForm } = useValidation<
    Omit<Employee, "IdСотрудника" | "КодОтдела">
  >({
    ФИО: (value) => validateName(value as string),
    Должность: (value) => validatePosition(value as string | number),
    Стаж: (value) => validateExperience(value as string | number | undefined),
    КонтактныйТелефон: () =>
      validatePhoneNumber(formState.КонтактныйТелефон, []),
    ЗаработнаяПлата: (value) => validateSalary(Number(value)),
    УровеньОбразования: (value) => validateEducationLevel(value as string),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await updateEmployee({
        employee: {
          ...formState,
          ЗаработнаяПлата: Number(formState.ЗаработнаяПлата),
        },
        id: IdСотрудника.toString(),
      });
      onEmployeeUpdated();
    } catch (error) {
      console.log("Error updating employee:", error);
    }
  };

  return (
    <BaseForm
      buttonText="Обновить сотрудника"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <CustomSelect
        label="Отдел"
        name="КодОтдела"
        value={formState.КодОтдела || ""}
        onChange={handleChange}
        options={
          departments?.map((department) => ({
            value: department.НазваниеОтдела.toString(),
            label: department.НазваниеОтдела,
            key: department.КодОтдела.toString(),
          })) || []
        }
      />
      <Input
        type="text"
        label="ФИО"
        name="ФИО"
        value={formState.ФИО}
        onChange={handleChange}
        fullWidth
        error={!!errors.ФИО}
        helperText={errors.ФИО}
      />
      <Input
        type="text"
        name="Должность"
        label="Должность"
        value={formState.Должность?.toString() || ""}
        onChange={handleChange}
        fullWidth
        error={!!errors.Должность}
        helperText={errors.Должность}
      />
      <Input
        type="number"
        name="Стаж"
        label="Стаж"
        value={Number(formState.Стаж) || ""}
        onChange={handleChange}
        inputProps={{ min: 0, max: 100 }}
        fullWidth
        error={!!errors.Стаж}
        helperText={errors.Стаж}
      />
      <MaskedInput
        mask={[
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
        value={formState.КонтактныйТелефон}
        onChange={handleChange}
        render={(ref, props) => (
          <Input
            {...props}
            inputRef={ref}
            type="tel"
            name="КонтактныйТелефон"
            label="Контактный телефон"
            fullWidth
            placeholder="000-000-0000"
            error={!!errors.КонтактныйТелефон}
            helperText={errors.КонтактныйТелефон}
          />
        )}
      />
      <Input
        type="number"
        name="ЗаработнаяПлата"
        label="Заработная плата"
        value={Number(formState.ЗаработнаяПлата) || ""}
        onChange={handleChange}
        inputProps={{ min: 1, max: 100000000 }}
        fullWidth
        error={!!errors.ЗаработнаяПлата}
        helperText={errors.ЗаработнаяПлата}
      />
      <CustomSelect
        label="Уровень образования"
        name="УровеньОбразования"
        value={formState.УровеньОбразования || ""}
        options={[
          { value: "среднее", label: "Среднее", key: 1 },
          { value: "высшее", label: "Высшее", key: 2 },
        ]}
        onChange={handleChange}
      />
    </BaseForm>
  );
};
