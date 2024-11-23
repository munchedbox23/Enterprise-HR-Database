import { Button, Box, CircularProgress } from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";
import { Input } from "@/shared/ui/Input";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useForm } from "@/shared/lib/hooks/useForm";
import {
  checkUserAuth,
  IUserRegister,
  useRegisterMutation,
} from "@/entities/user";
import { appRoutes } from "@/shared/const/routes";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/providers/StoreProvider";
import { useValidation } from "@/shared/lib/hooks/useValidate";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/shared/lib/validate";
import MaskedInput from "react-text-mask";

export const RegistrationForm = () => {
  const { formState, handleChange } = useForm<IUserRegister>({
    email: "",
    name: "",
    password: "",
    role: "employee",
  });

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { errors, validateForm } = useValidation<Omit<IUserRegister, "role">>({
    email: (email) => validateEmail(email || ""),
    name: (name) => validateName(name || ""),
    password: (password) => validatePassword(password || ""),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formState)) return;
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
        startAdornment={<Person />}
        value={formState.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
      />
      <Input
        label="Почта"
        type="email"
        name="email"
        startAdornment={<Email />}
        autoComplete="email"
        value={formState.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <Input
        label="Пароль"
        type="password"
        name="password"
        startAdornment={<Lock />}
        autoComplete="new-password"
        value={formState.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />
      <CustomSelect
        label="Роль"
        name="role"
        value={formState.role}
        options={[
          { value: "employee", label: "Сотрудник", key: 1 },
          { value: "admin", label: "Администратор", key: 2 },
        ]}
        onChange={handleChange}
      />
      {formState.role === "employee" && (
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
          value={formState.number}
          onChange={handleChange}
          render={(ref, props) => (
            <Input
              {...props}
              inputRef={ref}
              type="tel"
              name="number"
              label="Номер телефона"
              fullWidth
              placeholder="000-000-0000"
              error={!!errors.number}
              helperText={errors.number}
            />
          )}
        />
      )}
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mt: 2, color: "#f5ba1a", borderColor: "#f5ba1a" }}
      >
        {isLoading && <CircularProgress size={24} sx={{ marginRight: 1 }} />}
        {!isLoading && "Зарегистрироваться"}
      </Button>
    </Box>
  );
};
