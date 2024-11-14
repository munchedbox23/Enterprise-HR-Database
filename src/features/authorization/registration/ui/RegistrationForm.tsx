import { Button, Box } from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";
import { Input } from "@/shared/ui/Input";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useForm } from "@/shared/lib/hooks/useForm";
import { checkUserAuth, IUserRegister, useRegisterMutation } from "@/entities/user";
import { appRoutes } from "@/shared/const/routes";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/providers/StoreProvider";

export const RegistrationForm = () => {
  const { formState, handleChange } = useForm<IUserRegister>({
    email: "",
    name: "",
    password: "",
    role: "employee",
  });

  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(formState)
        .unwrap()
        .then(() => {
          dispatch(checkUserAuth()).then(() =>
            navigate(appRoutes.home(), { replace: true })
          );
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        maxWidth: "280px",
      }}
    >
      <Input
        label="Ваше имя"
        type="text"
        name="name"
        autoComplete="new-name"
        required
        startAdornment={<Person />}
        value={formState.name}
        onChange={handleChange}
      />
      <Input
        label="Почта"
        type="email"
        name="email"
        required
        startAdornment={<Email />}
        autoComplete="email"
        value={formState.email}
        onChange={handleChange}
      />
      <Input
        label="Пароль"
        type="password"
        name="password"
        required
        startAdornment={<Lock />}
        autoComplete="new-password"
        value={formState.password}
        onChange={handleChange}
      />

      <Input
        label="Повторите пароль"
        type="password"
        name="confirmPassword"
        autoComplete="new-password"
        required
        startAdornment={<Lock />}
      />
      <CustomSelect
        label="Роль"
        name="role"
        value={formState.role}
        options={[
          { value: "employee", label: "Сотрудник" },
          { value: "admin", label: "Администратор" },
        ]}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mt: 2, color: "#f5ba1a", borderColor: "#f5ba1a" }}
      >
        Зарегистрироваться
      </Button>
    </Box>
  );
};
