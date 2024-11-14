import { useForm } from "@/shared/lib/hooks/useForm";
import { Box, Button, CircularProgress } from "@mui/material";
import { checkUserAuth, useLoginMutation } from "@/entities/user";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "@/shared/const/routes";
import { IUserLogin } from "@/entities/user";
import { useAppDispatch } from "@/app/providers/StoreProvider";
import { Email, Lock } from "@mui/icons-material";
import { Input } from "@/shared/ui/Input";

export const LoginForm = () => {
  const { formState, handleChange } = useForm<IUserLogin>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading: isUserLogin }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formState)
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
        gap: "15px",
        width: "100%",
        maxWidth: "280px",
      }}
    >
      <Input
        type="email"
        name="email"
        label="Email"
        onChange={handleChange}
        autoComplete="email"
        value={formState.email}
        startAdornment={<Email />}
      />
      <Input
        type="password"
        name="password"
        label="Пароль"
        onChange={handleChange}
        value={formState.password}
        startAdornment={<Lock />}
      />
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mt: 2, color: "#f5ba1a", borderColor: "#f5ba1a" }}
      >
        {isUserLogin && <CircularProgress size={24} sx={{ marginRight: 1 }} />}
        {!isUserLogin && "Войти"}
      </Button>
    </Box>
  );
};
