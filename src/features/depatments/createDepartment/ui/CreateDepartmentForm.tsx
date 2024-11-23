import { BaseForm } from "@/shared/ui/BaseForm";
import { useForm } from "@/shared/lib/hooks/useForm";
import { DepartmentRecord } from "@/entities/staffing";
import { Input } from "@/shared/ui/Input";
import { useAddDepartmentMutation } from "../../api/departmentApi";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";
import MaskedInput from "react-text-mask";
import { validateDepartmentName } from "../model/validateDepartmentForm";
import { useGetDepartmentQuery } from "@/entities/staffing";
import { useValidation } from "@/shared/lib/hooks/useValidate";
import { validatePhoneNumber } from "@/shared/lib/validate";

export const CreateDepartmentForm = ({
  onDepartmentAdded,
}: {
  onDepartmentAdded: () => void;
}) => {
  const { formState, handleChange } = useForm<
    Omit<DepartmentRecord, "КодОтдела">
  >({
    НазваниеОтдела: "",
    КонтактныйТелефон: "",
  });

  const [addDepartment, { isLoading }] = useAddDepartmentMutation();
  const { closeModal } = useModalContext();
  const { data: departments = [] } = useGetDepartmentQuery();

  const existingPhones = departments.map(
    (department) => department.КонтактныйТелефон
  );

  const { errors, validateForm } = useValidation<
    Omit<DepartmentRecord, "КодОтдела">
  >({
    НазваниеОтдела: () => validateDepartmentName(formState.НазваниеОтдела),
    КонтактныйТелефон: () =>
      validatePhoneNumber(formState.КонтактныйТелефон, existingPhones),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
    try {
      await addDepartment(formState);
      closeModal();
      onDepartmentAdded();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BaseForm
      buttonText="Создать"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
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
            label="Телефон"
            fullWidth
            placeholder="000-000-0000"
            error={!!errors.КонтактныйТелефон}
            helperText={errors.КонтактныйТелефон}
          />
        )}
      />
      <Input
        type="text"
        name="НазваниеОтдела"
        label="Название отдела"
        onChange={handleChange}
        fullWidth
        error={!!errors.НазваниеОтдела}
        helperText={errors.НазваниеОтдела}
      />
    </BaseForm>
  );
};
