import { BaseForm } from "@/shared/ui/BaseForm";
import { useForm } from "@/shared/lib/hooks/useForm";
import { DepartmentRecord } from "@/entities/staffing";
import { Input } from "@/shared/ui/Input";
import { useAddDepartmentMutation } from "../../api/departmentApi";
import { useModalContext } from "@/app/providers/ModalProvider/config/lib/useModalContext";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <Input
        type="tel"
        name="КонтактныйТелефон"
        label="Контактный телефон"
        onChange={handleChange}
      />
      <Input
        type="text"
        name="НазваниеОтдела"
        label="Название отдела"
        onChange={handleChange}
      />
    </BaseForm>
  );
};
